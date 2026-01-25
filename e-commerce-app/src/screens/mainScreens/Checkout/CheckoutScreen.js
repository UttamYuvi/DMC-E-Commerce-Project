import { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../../../context/AuthContext";

import LoginModal from "../../../components/modals/LoginModal";
import AddressModal from "../../../components/modals/AddressModal";
import AddAddressModal from "../../../components/address/AddAddressModal";

import { getUserAddresses } from "../../../services/address";
import { useDispatch } from "react-redux";
import { clear } from "../../../slice/cartSlice";

export default function CheckoutScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const [step, setStep] = useState("LOGIN"); // LOGIN | ADDRESS | ADD_ADDRESS
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Move to ADDRESS after login */
  useEffect(() => {
    if (user) {
      setStep("ADDRESS");
    }
  }, [user]);

  /* Fetch addresses only when ADDRESS step is active */
  useEffect(() => {
    if (step === "ADDRESS" && user) {
      fetchAddresses();
    }
  }, [step, user]);

  const fetchAddresses = async () => {
    setLoading(true);

    try {
      // Artificial delay to test loader
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = await getUserAddresses();
      setAddresses(data || []);
    } catch (err) {
      console.log("Failed to fetch addresses", err);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = (address) => {
    console.log("Placing order with:", address);
    navigation.replace("PlaceOrderScreen");
    dispatch(clear());
  };

  return (
    <View style={{ flex: 1 }}>
      {/* LOGIN STEP */}
      {step === "LOGIN" && (
        <LoginModal
          visible
          onClose={(success) => success && setStep("ADDRESS")}
        />
      )}

      {/* ADDRESS STEP */}
      {step === "ADDRESS" && (
        <>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#FF7A00" />
            </View>
          ) : (
            <AddressModal
              visible
              addresses={addresses}
              onClose={() => navigation.goBack()}
              onAddNew={() => setStep("ADD_ADDRESS")}
              onConfirm={(addr) => {
                setSelectedAddress(addr);
                placeOrder(addr);
              }}
            />
          )}
        </>
      )}

      {/* ADD ADDRESS STEP */}
      {step === "ADD_ADDRESS" && (
        <AddAddressModal
          visible
          onClose={() => setStep("ADDRESS")}
          onSave={async () => {
            await fetchAddresses(); // refresh list
            setStep("ADDRESS");
          }}
        />
      )}
    </View>
  );
}
