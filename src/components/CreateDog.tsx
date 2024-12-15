import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { updateField, resetForm } from '../store/formSlice';
import useLocalStorage from '../effects/useLocalStorage';
import axios from 'axios';

const CreateDog: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token] = useLocalStorage('token', '');
  const form = useSelector((state: RootState) => state.form);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const dogImageResponse = await axios.get('https://dog.ceo/api/breeds/image/random');
      const newDog = { ...form, image: dogImageResponse.data.message };

      await axios.post('https://dogs.kobernyk.com/api/v1/dogs', newDog, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(resetForm());
      navigate('/');
    } catch (error) {
      console.error('Failed to create dog', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link to="/">На головну</Link>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={form.name}
            onChange={(e) => dispatch(updateField({ field: 'name', value: e.target.value }))}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            value={form.age}
            onChange={(e) => dispatch(updateField({ field: 'age', value: +e.target.value }))}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Breed:
          <input
            type="text"
            value={form.breed}
            onChange={(e) => dispatch(updateField({ field: 'breed', value: e.target.value }))}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Color:
          <input
            type="text"
            value={form.color}
            onChange={(e) => dispatch(updateField({ field: 'color', value: e.target.value }))}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateDog;
