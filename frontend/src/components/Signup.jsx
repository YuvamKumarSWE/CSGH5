import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Create an account
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Start generating study guides today.
                    </Typography>
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        bgcolor: '#111'
                    }}
                >
                    <Box component="form" onSubmit={handleSignup}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                py: 1.2,
                                bgcolor: '#EDEDED',
                                color: '#000',
                                '&:hover': { bgcolor: '#FFF' }
                            }}
                        >
                            Sign up
                        </Button>
                    </Box>
                </Paper>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#EDEDED', textDecoration: 'none', fontWeight: 500 }}>
                            Log in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;
