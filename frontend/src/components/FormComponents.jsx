import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import "../styles/FormComponent.css"

const FormComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateName = (value) => /^[A-Z]/.test(value) ? '' : 'Name must start with a capital letter';
    const validateEmail = (value) => /\S+@\S+\.\S+/.test(value) ? '' : 'Valid email is required';
    const validateMobile = (value) => /^[6789]\d{9}$/.test(value) ? '' : 'Mobile number must be 10 digits starting with 6, 7, 8, or 9';
    const validateGender = (value) => value ? '' : 'Gender is required';
    const validateDesignation = (value) => value ? '' : 'Designation is required';
    const validateCourse = (values) => values.length > 0 ? '' : 'At least one interest is required';
    const validateImage = (value) => value ? '' : 'Image is required';

    const handleValidation = () => {
        const newErrors = {};
        newErrors.name = validateName(name);
        newErrors.email = validateEmail(email);
        newErrors.mobile = validateMobile(mobile);
        newErrors.gender = validateGender(gender);
        newErrors.designation = validateDesignation(designation)
        newErrors.course = validateCourse(course);
        newErrors.image = validateImage(image);
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidation()) {
            return; // Stop form submission if validation fails
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('gender', gender);
        formData.append('designation', designation);
        formData.append('course', JSON.stringify(course));
        formData.append('date', date); // Add date to form data
        if (image) formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully');
            navigate('/table'); // Navigate to table view
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <Navbar />
            <h2>Fill up the Employee Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div>
                    <label>NAME:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter the username'
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <label>EMAIL:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email id'
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div>
                    <label>MOBILE NUMBER:</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder='Enter your mobile number'
                    />
                    {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile}</p>}
                </div>
                <div>
                    <label>DESIGNATION:</label>
                    <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="hr">HR</option>
                        <option value="manager">MANAGER</option>
                        <option value="sales">SALES</option>
                    </select>
                    {errors.designation && <p style={{ color: 'red' }}>{errors.designation}</p>}
                </div>
                <div>
                    <label>GENDER:</label>
                    <input
                        type="radio"
                        id="male"
                        name="male"
                        value="male"
                        checked={gender === 'male'}
                        onChange={(e) => setGender(e.target.value)}
                    /> Male
                    <input
                        type="radio"
                        id="female"
                        name="female"
                        value="female"
                        checked={gender === 'female'}
                        onChange={(e) => setGender(e.target.value)}
                    /> Female
                </div>
                <div>
                    <label>COURSE:</label>
                    <input
                        type="checkbox"
                        value="MCA"
                        onChange={(e) => {
                            const value = e.target.value;
                            setCourse(prev =>
                                e.target.checked ? [...prev, value] : prev.filter(i => i !== value)
                            );
                        }}
                    /> MCA
                    <input
                        type="checkbox"
                        value="BSC"
                        onChange={(e) => {
                            const value = e.target.value;
                            setCourse(prev =>
                                e.target.checked ? [...prev, value] : prev.filter(i => i !== value)
                            );
                        }}
                    /> BSC
                    <input
                        type="checkbox"
                        value="BCA"
                        onChange={(e) => {
                            const value = e.target.value;
                            setCourse(prev =>
                                e.target.checked ? [...prev, value] : prev.filter(i => i !== value)
                            );
                        }}
                    /> BCA
                    {errors.course && <p style={{ color: 'red' }}>{errors.course}</p>}
                </div>
                <div>
                    <label>UPLOAD IMAGE:</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                    />
                    {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
                </div>
                <div>
                    <label>DATE:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormComponent;
