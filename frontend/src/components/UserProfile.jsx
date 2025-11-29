import React from 'react';
import { Box, Typography, Container, Paper, Avatar, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navbar from './Navbar';

const mockGuides = [
    { id: 1, title: 'Introduction to React', date: 'Oct 25, 2023', tags: ['React', 'Frontend'], status: 'Completed' },
    { id: 2, title: 'Advanced CSS Techniques', date: 'Nov 02, 2023', tags: ['CSS', 'Design'], status: 'In Progress' },
    { id: 3, title: 'Node.js Backend Basics', date: 'Nov 10, 2023', tags: ['Node.js', 'Backend'], status: 'Completed' },
    { id: 4, title: 'Understanding Async/Await', date: 'Nov 15, 2023', tags: ['JavaScript', 'Async'], status: 'Review' },
];

const UserProfile = () => {
    return (
        <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
            <Navbar />
            <Container maxWidth="lg">
                {/* Profile Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 8 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: '#333',
                            fontSize: '2rem',
                            fontWeight: 600,
                            mr: 3,
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        YK
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            Yuvam Kumar
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            yuvam@example.com • Free Plan
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                    Recent Guides
                </Typography>

                <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ '& th': { color: '#A1A1A1', fontWeight: 500 } }}>
                                <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockGuides.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' },
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: '#EDEDED' }}>
                                        {row.title}
                                    </TableCell>
                                    <TableCell sx={{ color: '#A1A1A1' }}>{row.date}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {row.tags.map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '4px',
                                                        height: '24px',
                                                        fontSize: '0.75rem',
                                                        bgcolor: 'rgba(255,255,255,0.05)',
                                                        color: '#EDEDED'
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            sx={{
                                                borderRadius: '4px',
                                                height: '24px',
                                                fontSize: '0.75rem',
                                                bgcolor: row.status === 'Completed' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(255,255,255,0.05)',
                                                color: row.status === 'Completed' ? '#66BB6A' : '#A1A1A1'
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default UserProfile;
