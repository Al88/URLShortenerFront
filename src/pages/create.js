import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { environment } from '../environment/env';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const [url, setUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidHttpUrl(url)) {
            try {
                createShortUrl(url);
            } catch (error) {
                console.error("Error fetching URLs:", error);
            } finally {
            }
        }
        setUrl('');
    };

    const createShortUrl = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(environment.API_URL + '/url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Short URL created:', data);
                // Redirigir a la ruta deseada, por ejemplo: '/success'
                navigate('/list');
            } else {
                console.error('Failed to create short URL');
            }
            setLoading(false);

        } catch (error) {
            console.error('Error creating short URL:', error);
        }
    };

    function isValidHttpUrl(s) {
        let url;
        try {
            url = new URL(s);
        } catch (e) { return false; }
        return /https?/.test(url.protocol);
    }

    return (
        <>
            <Card style={{ width: '48rem' }}>
                <Card.Body>
                    <Card.Title>Create new URL</Card.Title>
                    <hr></hr>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Original URL:</Form.Label>
                            <InputGroup className="mb-3">
                                <input
                                    className="form-control"
                                    placeholder="http://www.example.com"
                                    aria-describedby="basic-addon2"
                                    value={url}
                                    type="url"
                                    required
                                    onChange={(e) => setUrl(e.target.value)} />
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{errorMessage}</span>
                                <Button
                                    type="submit"
                                    variant="outline-secondary"
                                    id="button-addon2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
