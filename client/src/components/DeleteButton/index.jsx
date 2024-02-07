import { useMutation } from '@apollo/client';
import { DELETE_GOAL } from '../../utils/mutations'

const DeleteButton = ({ goalId }) => {
  const [removeGoal, { loading, error }] = useMutation(DELETE_GOAL);

  const handleDelete = async () => {
    try {
      const { data } = await removeGoal({ variables: { goalId } });

      // Handle the response as needed
      console.log('Goal deleted:', data.deleteGoal);
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error('Error deleting goal:', error.message);
    }
  };

  return (
    <button className= "btn btn-danger mx-5" onClick={handleDelete} disabled={loading}>
      DELETE GOAL
    </button>
  );
};

export default DeleteButton;