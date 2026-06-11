const WishListButton = ({ wished, count, onClick }) => {
  return (
    <button onClick={onClick} className="wishlist-button">
      {wished ? '💖' : '🤍'} {count}
    </button>
  );
};

export default WishListButton;