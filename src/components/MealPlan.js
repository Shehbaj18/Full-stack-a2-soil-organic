import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MealList from "./MealList";
import "./MealPlan.css";

function MealPlan() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoals, setHealthGoals] = useState('');
  const [calories, setCalories] = useState(null);
  const [mealData, setMealData] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/login"); // Redirect to login page if user data is not found
    }
  }, [navigate]);

  function calculateBMR(age, weight, height, gender) {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      throw new Error('Invalid gender');
    }
  }

  function calculateDailyCalories(bmr, activityLevel, healthGoals) {
    let activityFactor;
    switch (activityLevel) {
      case 'sedentary':
        activityFactor = 1.2;
        break;
      case 'lightly active':
        activityFactor = 1.375;
        break;
      case 'moderately active':
        activityFactor = 1.55;
        break;
      case 'extra active':
        activityFactor = 1.9;
        break;
      default:
        throw new Error('Invalid activity level');
    }

    let healthGoalFactor;
    switch (healthGoals) {
      case 'lose':
        healthGoalFactor = 0.8;
        break;
      case 'maintain':
        healthGoalFactor = 1;
        break;
      case 'gain':
        healthGoalFactor = 1.2;
        break;
      default:
        throw new Error('Invalid health goal');
    }

    return Math.round(bmr * activityFactor * healthGoalFactor);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const bmr = calculateBMR(
      parseInt(age),
      parseFloat(weight),
      parseFloat(height),
      gender.toLowerCase()
    );
    const dailyCalories = calculateDailyCalories(
      bmr,
      activityLevel.toLowerCase(),
      healthGoals.toLowerCase()
    );
    setCalories(dailyCalories);
    fetchMealData(dailyCalories);
  }

  function fetchMealData(targetCalories) {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=4bdc3d93e1a144939cd6f927f0060cee&timeFrame=day&targetCalories=${targetCalories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case 'age':
        setAge(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'activityLevel':
        setActivityLevel(value);
        break;
      case 'healthGoals':
        setHealthGoals(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="meal-plan-container">
      <form className="meal-plan-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input type="number" id="weight" name="weight" value={weight} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input type="number" id="height" name="height" value={height} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="activityLevel">Activity Level:</label>
          <select id="activityLevel" name="activityLevel" value={activityLevel} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightly active">Lightly Active</option>
            <option value="moderately active">Moderately Active</option>
            <option value="extra active">Extra Active</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="healthGoals">Health Goals:</label>
          <select id="healthGoals" name="healthGoals" value={healthGoals} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
        <button type="submit">Calculate Calorie Intake</button>
      </form>
      {calories && <p>Your daily calorie intake should be approximately {calories} calories.</p>}
      {mealData && <MealList mealData={mealData} />}
    </div>
  );
}

export default MealPlan;
