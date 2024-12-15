import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { RootState } from '../store/store';
import { fetchDogById } from '../api/dogAPI';
import { setDogs, setError, setLoading } from '../store/dogsSlice';
import useLocalStorage from '../effects/useLocalStorage';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Dog = () => {
  const [token] = useLocalStorage('token', '');
  const { dogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dog = useSelector((state: RootState) =>
    state.dogs.dogs.find((dog) => dog._id === dogId)
  );
  const loading = useSelector((state: RootState) => state.dogs.loading);
  const error = useSelector((state: RootState) => state.dogs.error);

  useEffect(() => {
    if (!dog && token) {
      dispatch(setLoading(true));
      fetchDogById(dogId, token)
        .then((data) => {
          dispatch(setDogs([data])); // Додаємо собаку до списку
        })
        .catch((err) => {
          dispatch(setError('Dog not found.'));
          navigate('/');
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [dogId, token, dog, dispatch, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dog) return null;

  return (
    <div>
      <Link to="/">На головну</Link>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={dog.image} title={dog.name} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {dog.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Колір: {dog.color} <br />
            Порода: {dog.breed}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dog;
