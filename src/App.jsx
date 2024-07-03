import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Achievements from './components/Achievements';

const App = () => {
  // State to manage achievements
  const [achievements, setAchievements] = useState(() => {
    const storedAchievements = localStorage.getItem('achievements');
    return storedAchievements ? JSON.parse(storedAchievements) : [];
  });

  // Function to add achievement
  const addAchievement = (achievement) => {
    const newAchievements = [...achievements, { ...achievement, id: Date.now() }];
    setAchievements(newAchievements);
    localStorage.setItem('achievements', JSON.stringify(newAchievements));
  };

  // Function to delete achievement
  const deleteAchievement = (id) => {
    const updatedAchievements = achievements.filter((achievement) => achievement.id !== id);
    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<div className='items-center justify-center'><Home addAchievement={addAchievement} /></div>} />
          <Route
            path="/achievements"
            element={<Achievements achievements={achievements} deleteAchievement={deleteAchievement} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
