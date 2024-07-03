import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Achievements from './components/Achievements';

const App = () => {
  const [achievements, setAchievements] = useState(() => {
    const storedAchievements = localStorage.getItem('achievements');
    return storedAchievements ? JSON.parse(storedAchievements) : [];
  });

  const addAchievement = (achievement) => {
    const newAchievements = [{ ...achievement, id: Date.now() }, ...achievements];
    setAchievements(newAchievements);
    localStorage.setItem('achievements', JSON.stringify(newAchievements));
  };
  

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
