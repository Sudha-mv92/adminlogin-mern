import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import "../styles/Table.css"

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/data');
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/data/${id}`);
            setData(data.filter(item => item._id !== id));
        } catch (error) {
            console.error('There was an error deleting the data!', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <div>
            <NavBar />
            <h2>Employee Details</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <h4>Total Records: {filteredData.length}</h4>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                                {item.image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${item.image}`}
                                        alt="uploaded"
                                        style={{ width: '100px' }}
                                    />
                                )}
                            </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobile}</td>
                            <td>{item.designation}</td>
                            <td>{item.gender}</td>
                            <td>{item.course}</td>
                            <td>{item.date}</td>
                            <td className="button-container">
                                <button onClick={() => handleEdit(item._id)}>Edit</button>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
