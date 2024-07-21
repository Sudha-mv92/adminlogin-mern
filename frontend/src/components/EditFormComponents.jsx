import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';

const EditComponent = () => {
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState(null);
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/data/${id}`);
                const fetchedData = response.data;
                setData(fetchedData);
                setName(fetchedData.name);
                setEmail(fetchedData.email);
                setMobile(fetchedData.mobile);
                setDesignation(fetchedData.designation);
                setGender(fetchedData.gender);
                setCourse(Array.isArray(fetchedData.course) ? fetchedData.course : []);
                setDate(fetchedData.date);
                setImage(fetchedData.image);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
        fetchData();
    }, [id]);

    const validateName = (value) => /^[A-Z]/.test(value) ? '' : 'Name must start with a capital letter';
    const validateEmail = (value) => /\S+@\S+\.\S+/.test(value) ? '' : 'Valid email is required';
    const validateMobile = (value) => /^[6789]\d{9}$/.test(value) ? '' : 'Mobile number must be 10 digits starting with 6, 7, 8, or 9';
    const validateDesignation = (value) => value ? '' : 'Designation is required';
    const validateGender = (value) => value ? '' : 'Gender is required';
    const validateCourse = (values) => values.length > 0 ? '' : 'At least one course is required';

    const handleValidation = () => {
        const newErrors = {};
        newErrors.name = validateName(name);
        newErrors.email = validateEmail(email);
        newErrors.mobile = validateMobile(mobile);
        newErrors.designation = validateDesignation(designation);
        newErrors.gender = validateGender(gender);
        newErrors.course = validateCourse(course);
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!handleValidation()) {
            return; // Stop form submission if validation fails
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', JSON.stringify(course));
        formData.append('date', date); // Add date to form data
        if (image) formData.append('image', image);

        try {
            const response = await axios.put(`http://localhost:5000/api/data/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Update successful:', response.data);
            navigate('/table'); // Navigate to table view
        } catch (error) {
            console.error('There was an error updating the form!', error);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <NavBar />
            <h2>EDIT EMPLOYEE DETAILS</h2>
            {data ? (
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>NAME:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label>EMAIL:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div>
                        <label>MOBILE NUMBER:</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                        /> Male
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                        /> Female
                        {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
                    </div>
                    <div>
                        <label>COURSE:</label>
                        <input
                            type="checkbox"
                            value="MCA"
                            checked={course.includes('MCA')}
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
                            checked={course.includes('BSC')}
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
                            checked={course.includes('BCA')}
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
                        <label>Upload Image:</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                        />
                        {data.image && !image && <p>Current Image: <img src={`http://localhost:5000/uploads/${data.image}`} alt="uploaded" style={{ width: '100px' }} /></p>}
                        {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditComponent;
