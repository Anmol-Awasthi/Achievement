import React, { useState } from 'react';

const Achievements = ({ achievements, deleteAchievement }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [achievementToDelete, setAchievementToDelete] = useState(null);

  // Function to handle deletion of an achievement
  const handleDelete = (id) => {
    setAchievementToDelete(id);
    setShowDeleteConfirmation(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    deleteAchievement(achievementToDelete);
    setShowDeleteConfirmation(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
        {achievements.length === 0 ? (
          <p className="text-gray-400">No achievements yet.</p>
        ) : (
          achievements.map((achievement) => (
            <div key={achievement.id} className="bg-gray-800 rounded-lg p-4 mb-4 mx-3">
              <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
              <p className="text-gray-400 mb-2">{achievement.description}</p>
              <p className="text-gray-400 mb-2">Category: {achievement.category}</p>
              <p className="text-gray-400 mb-2">Date Achieved: {achievement.date}</p>
              <div className="flex items-center justify-between">
                {achievement.file && (
                  <div className="w-20 h-20 overflow-hidden rounded-lg mr-4">
                    {typeof achievement.file === 'object' ? (
                      // Check if the file is an image
                      achievement.file.type.startsWith('image') ? (
                        <img
                          src={URL.createObjectURL(achievement.file)}
                          alt="Achievement Media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-700 p-2 rounded-lg">
                          <p className="text-white">File Type: {achievement.file.type}</p>
                          <p className="text-white">File Name: {achievement.file.name}</p>
                        </div>
                      )
                    ) : (
                      <p className="text-gray-400">No file uploaded</p>
                    )}
                  </div>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(achievement.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
        {/* Delete Confirmation Overlay */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
              <h2 className="text-xl font-bold text-red-600 mb-2">Think Again!</h2>
              <p className="text-gray-700">Delete this achievement ?</p>
              <div className="flex justify-around items-center gap-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={confirmDelete}
                >
                  Yes, Delete it!
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;