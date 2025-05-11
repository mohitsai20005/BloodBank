import React, { useState, useEffect } from 'react';

const SearchDonorForm = () => {
  const [state, setState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donors, setDonors] = useState([]);

  const districtData = {
    AP: ["Anantapur", "Chittoor", "Guntur", "Kadapa", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "East Godavari"],
    TG: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahbubnagar", "Medak", "Medchal", "Mulugu", "Nalgonda", "Nizamabad", "Peddapalli", "Rajanna", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal"]
  };

  useEffect(() => {
    setDistricts(districtData[state] || []);
    setDistrict('');
  }, [state]);

  const handleSearch = async () => {
    if (!state || !district || !bloodGroup) {
      alert("Please select all fields before searching.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/donors/search?state=${state}&district=${district}&bloodGroup=${bloodGroup}`);
      const data = await response.json();
      console.log(data);  // Check the response data structure
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search a Donor</h2>
      <div style={{ marginBottom: '15px' }}>
        <label>State:&nbsp;</label>
        <select value={state} onChange={e => setState(e.target.value)}>
          <option value="">-- Select State --</option>
          <option value="AP">AP</option>
          <option value="TG">TG</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>District:&nbsp;</label>
        <select value={district} onChange={e => setDistrict(e.target.value)} disabled={!state}>
          <option value="">-- Select District --</option>
          {districts.map((d, idx) => (
            <option key={idx} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Blood Group:&nbsp;</label>
        <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)}>
          <option value="">-- Select Blood Group --</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      <button onClick={handleSearch}>Search</button>

      {donors.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Matching Donors</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={index}>
                  <td>{donor.name}</td>
                  <td>{donor.contact ? donor.contact.phoneNumber : 'N/A'}</td>
                  <td>{donor.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {donors.length === 0 && state && district && bloodGroup && (
        <p style={{ marginTop: '20px', color: 'red' }}>No donors found for the selected criteria.</p>
      )}
    </div>
  );
};

export default SearchDonorForm;
