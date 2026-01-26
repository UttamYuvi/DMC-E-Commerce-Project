import { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../../../context/AuthContext";

import LoginModal from "../../../components/modals/LoginModal";
import AddressModal from "../../../components/modals/AddressModal";
import AddAddressModal from "../../../components/address/AddAddressModal";

import { getUserAddresses } from "../../../services/address";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../../slice/cartSlice";
import { placeOrderService } from "../../../services/order";
// import { add } from "react-native/types_generated/Libraries/Animated/AnimatedExports";
// import CartScreen from "../Cart/CartScreen";

export default function CheckoutScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items)

  const [step, setStep] = useState("LOGIN");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && step === "LOGIN") {
      setStep("ADDRESS");
    }
  }, [user]);

  useEffect(() => {
    if (step === "ADDRESS" && user) {
      fetchAddresses();
    }
  }, [step, user]);

  const fetchAddresses = async () => {
    // if (!user?.token) return;
    setLoading(true);

    try {
      const data = await getUserAddresses(user.token);
      console.log(data)
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Failed to fetch addresses", err);
      setAddresses([])
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (address) => {
    if (!user?.token) {
    console.log("User not logged in");
    setStep("LOGIN");
    return;
    }
    if(!address) {
      console.log("No address selected")
      return
    }
    if(!items || items.length === 0) {
      console.log("Cart is empty")
      return
    }

    const payload = {
      addressId: address.addressId,
      orderDetailsReqDTOList: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))
    }
    try {
      console.log("Placing order with:", payload);
      const result = await placeOrderService(payload,user.token)
      navigation.replace("PlaceOrderScreen",{
      orderId: result.orderId,
      totalAmount: result.totalAmount,
      deliveryAddress: result.deliveryAddress,
      orderDetails: result.orderDetails,
    });
    dispatch(clear());
    } catch(err) {
      console.log(err)
    }
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
