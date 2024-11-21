
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../environment/env';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

export default function Redirect() {
    const { code } = useParams();
    const [ originalUrl, setOriginalUrl] = React.useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const response = await axios.get(`${environment.API_URL}/${code}`);
                console.log(response);
                setOriginalUrl(response.data.url.original_url);
                setTimeout(() => {
                    window.location.href = response.data.url.original_url;
                }, 2000);
            } catch (error) {
                console.error('Error fetching original URL:', error);
                setIsLoading(false);
                navigate('/list');
            }
        };

        fetchOriginalUrl();
    }, [code, navigate]);

    return (
        <Card style={{ width: '48rem' }}>
            <Card.Body>
                <div>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                            <p>Redirecting...</p>
                            <h5>Redirecting to: {originalUrl}</h5>

                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}