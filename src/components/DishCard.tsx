import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

type DishCardProps = {
  title: string;
  image: string;
  price: number;
  onAddToCart: () => void;
};

const DishCard: React.FC<DishCardProps> = ({ title, image, price, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: '#1e1e1e' }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div" color="white">
          {title}
        </Typography>
        <Typography variant="body2" color="gray">
          Price: ${price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddToCart}
          sx={{ mt: 1 }}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default DishCard;