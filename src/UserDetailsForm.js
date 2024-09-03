import React, { useState } from 'react';
import './UserDetailsForm.css';

const UserDetailsForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: '',
    contact_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const btn = document.querySelector("#btn");
    const btnText = document.querySelector("#btnText");

    btnText.innerHTML = "Submitting...";
    btn.classList.add("active");

    try {
      const response = await fetch('https://chatbotappbackend.azurewebsites.net/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        onFormSubmit(result);
        btnText.innerHTML = "Thanks";
      } else {
        console.error('Failed to submit form');
        btnText.innerHTML = "Submit";
        btn.classList.remove("active");
      }
    } catch (error) {
      console.error('Error:', error);
      btnText.innerHTML = "Submit";
      btn.classList.remove("active");
    }
  };

  return (
    <div className='user'>
      <div className="user-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder='Name *'
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email"></label>
          <input
            type="email"
            placeholder='Email *'
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact_number"></label>
          <input
            type="text"
            id="contact_number"
            placeholder='Contact Number *'
            name="contact_number"
            className="form-input"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />

          <label htmlFor="company_name"></label>
          <input
            type="text"
            id="company_name"
            placeholder='Company Name'
            name="company_name"
            className="form-input"
            value={formData.company_name}
            onChange={handleChange}
          />

          <div className="container">
            <button id="btn" type="submit">
              <p id="btnText">Submit</p>
              <div className="check-box">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                  <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
