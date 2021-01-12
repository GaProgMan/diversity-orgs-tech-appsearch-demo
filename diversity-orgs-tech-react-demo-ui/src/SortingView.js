import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const setDefaultStyle = {
  option: () => ({}),
  control: () => ({}),
  dropdownIndicator: () => ({}),
  indicatorSeparator: () => ({})
};

function OrderCase(props) {
  const orderImgStyle = {
    display: "inline-block",
    marginRight: "5px",
    paddingTop: "5px",
    paddingLeft: "5px",
    height: "15px"
  };
  const ascImage = (
    <img
      src= "{PUBLIC_URL}/heroicons/optimized/outline/chevron-up.svg"
      style={orderImgStyle}
      alt="ascending-order"
    />
  );
  const descImage = (
    <img
      src= "{PUBLIC_URL}/heroicons/optimized/outline/chevron-down.svg"
      style={orderImgStyle}
      alt="descending-order"
    />
  );

  switch (props.value.split("|")[3]) {
    case "asc":
      return ascImage;
    case "desc":
      return descImage;
    default:
      return '';
  }
}

function SortingView({ className, label, onChange, options, value, ...rest }) {
  const selectedValue = value;
  const selectedOption = selectedValue
    ? options.find((option) => option.value === selectedValue)
    : null;

  return (
    <div className="sui-sorting" {...rest}>
      {label && <div className="sui-sorting__label">{label}</div>}
      <Select
        className="sui-select"
        classNamePrefix="sui-select"
        value={selectedOption}
        onChange={(o) => onChange(o.value)}
        options={options.map((o) => ({
          ...o,
          label: (
            <div>
              {o.label}
              {OrderCase(o)}
            </div>
          )
        }))}
        isSearchable={false}
        styles={setDefaultStyle}
      />
    </div>
  );
}

SortingView.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  value: PropTypes.string
};

export default SortingView;
