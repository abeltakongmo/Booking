import { useState } from "react";
import "../assets/css/components/select.css";

export default function Select({ value, items, onChange }) {
  const [onSelect, setOnSelect] = useState(false);
  const [onSubSelect, setOnSubSelect] = useState(false);
  const [selected, setSelected] = useState(items ? items[0] : null);

  const handleOnChange = (item) => {
    onChange(item);
  };
  return (
    <div
      className="select-wrapper"
      onClick={() => setOnSelect((prev) => !onSelect)}
    >
      <span className="curr-select">{value ? value?.name : "--Select--"}</span>
      <div className={onSelect ? "select-items active" : "select-items"}>
        {items.map((item) => (
          <div
            className={
              value?._id === item?._id ? "select-item active" : "select-item"
            }
            key={item?._id}
          >
            <div onClick={() => onChange(item)} className="select-item-value">
              {item?.name}
            </div>
            {item?.subnames.length > 0 && (
              <ul
                className={
                  onSubSelect ? "select-sub-items active" : "select-sub-items"
                }
              >
                {item?.subnames.map((sub, index) => (
                  <li key={index}>{sub}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
