import './button.style.scss'

const BUTTON_TYPE_CLASSES = {
    google:'google-sing-in',
    inverted:'inverted'
}

const BUTTON = ({ children, buttonType, ...otherProps }) => {
  return <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
  {...otherProps}>{children}</button>;
};

export default BUTTON;
