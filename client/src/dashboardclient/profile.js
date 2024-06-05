import React, { useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        try {
            const response = await fetch('http://localhost:3001/update-profile', requestOptions);
            if (response.ok) {
                console.log('Profile updated successfully');
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleDecline = async () => {
        try {
            const response = await fetch('http://localhost:3001/decline-changes', { method: 'POST' });
            if (response.ok) {
                console.log('Changes declined');
            } else {
                console.error('Error declining changes');
            }
        } catch (error) {
            console.error('Error declining changes:', error);
        }
    };

    return (
        <div className='profile-container'>
            <h1>Welcome to your SMART SYSTEM Profile!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Save</button>
                <button type="button" onClick={handleDecline}>Decline</button>
            </form>
        </div>
    );
};

export default Profile;