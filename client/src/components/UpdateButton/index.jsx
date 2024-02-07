import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_GOAL_DESCRIPTION } from '../../utils/mutations';

const UpdateButton = ({ goalId, currentGoalDescription }) => {
  const [newGoalDescription, setNewGoalDescription] = useState(currentGoalDescription);
  const [updateGoalDescription, { loading, error }] = useMutation(UPDATE_GOAL_DESCRIPTION);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleUpdate = async () => {
    try {
      const { data } = await updateGoalDescription({
        variables: { goalId, newGoalDescription },
      });

      // Handle the response as needed
      console.log('Goal updated:', data.updateGoal);
      
      // Hide form upon success
      setIsFormVisible(false);
    } catch (error) {
      // Handle error
      console.error('Error updating goal:', error.message);
    }
  };

  return (
    <div>
      <button className="btn btn-white mt-2" onClick={() => setIsFormVisible(true)}>
        UPDATE GOAL DESCRIPTION
      </button>
      {isFormVisible && (
        <div>
          <input
            type="text"
            value={newGoalDescription}
            onChange={(e) => setNewGoalDescription(e.target.value)}
            className="mt-2"
          />
          <button onClick={handleUpdate} disabled={loading}>
            UPDATE
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateButton;
