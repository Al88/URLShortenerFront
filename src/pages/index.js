import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { environment } from '../environment/env';

export default function Index() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrls() {
        try {
            const response = await fetch(environment.API_URL + '/url');
            const data = await response.json();
            setUrls(data.urls);
        } catch (error) {
            console.error("Error fetching URLs:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUrls();

        const interval = setInterval(() => {
            fetchUrls();
        }, 40000);

        return () => clearInterval(interval);
    }, []);

    const deleteUrl = async (id) => {
        try {
            const response = await fetch(`${environment.API_URL}/url/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUrls(urls.filter((url) => url.id !== id));
            } else {
                console.error("Failed to delete URL");
            }
        } catch (error) {
            console.error("Error deleting URL:", error);
        }
    };

    return (
        <Card style={{ width: '48rem' }}>
            <Card.Body>
                <Card.Title>
                    Shortened URLs:
                    <Link className="pull-right btn btn-outline-dark btn-sm" to="/create">
                        <i className="fa fa-plus"></i>
                    </Link>
                </Card.Title>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code</th>
                                <th>Original URL</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((url) => (
                                <tr key={url.id}>
                                    <td>{url.id}</td>
                                    <td>{url.short_code}</td>
                                    <td width="50%">
                                        {url.original_url}
                                    </td>
                                    <td>
                                        <a className="btn btn-outline-dark btn-sm mr1" href={`${environment.APP_URL}/${url.short_code}`} target="_blank" >
                                            <i className="fa-solid fa-up-right-from-square"></i>
                                        </a>
                                        <a className="btn btn-outline-dark btn-sm" onClick={() => deleteUrl(url.id)} >
                                            <i className="fa-solid fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
}
