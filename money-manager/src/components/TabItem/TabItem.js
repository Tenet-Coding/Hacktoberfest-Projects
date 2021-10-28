import "./TabItem.css";

const TabItem = (props) => {
  const {tabDetails, money } = props;
  const { heading, iconUrl, alt, bgColor, bColor } = tabDetails;
  console.log(money);
  return (
    <div
      className='tab-item'
      style={{
        backgroundColor: { bgColor },
        borderColor: { bColor },
      }}
    >
    
      <div className='tab-item__image_container'>
        <img src={iconUrl} alt={alt} />
      </div>
      <div className='tab-item__content'>
        <p>{heading}</p>
        <h1>Rs. {money}</h1>
      </div>
    </div>
  );
};

export default TabItem;
