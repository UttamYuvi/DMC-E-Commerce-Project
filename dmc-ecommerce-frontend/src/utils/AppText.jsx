// Common function to merge styles
const mergeStyle = (base, custom) => ({ ...base, ...custom });

// Header Component
export const AppHeader = ({
  children,
  color = "#000",
  align = "left",
  style = {},
}) => {
  const baseStyle = {
    fontSize: "22px",
    fontWeight: 700,
    color,
    textAlign: align,
    margin: "16px 0",
  };
  return <h1 style={mergeStyle(baseStyle, style)}>{children}</h1>;
};

// Sub Header Component
export const AppSubHeader = ({
  children,
  color = "#444",
  align = "left",
  style = {},
}) => {
  const baseStyle = {
    fontSize: "20px",
    fontWeight: 600,
    color,
    textAlign: align,
    margin: "6px 0",
  };
  return <h2 style={mergeStyle(baseStyle, style)}>{children}</h2>;
};

// Normal Text Component
export const AppText = ({
  children,
  color = "#666",
  align = "left",
  weight = 400,
  style = {},
}) => {
  const baseStyle = {
    fontSize: "14px",
    fontWeight: weight,
    color,
    textAlign: align,
    margin: "4px 0",
  };
  return <p style={mergeStyle(baseStyle, style)}>{children}</p>;
};
