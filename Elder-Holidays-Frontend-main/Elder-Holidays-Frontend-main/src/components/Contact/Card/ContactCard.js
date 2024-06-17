import { IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Facebook from '@mui/icons-material/FacebookRounded';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import Mail from '@mui/icons-material/MailOutline';
import Location from '@mui/icons-material/PinDropOutlined';
import Phone from '@mui/icons-material/Call';
import React from 'react';
import { Link } from 'react-router-dom';

const ContactCard = () => {
    return (
        <>
            <div className="text-left rounded-lg text-2xl contact-card pt-5" style={{ background: "#d3faffdb" }}>
                <div className="rounded-lg shadow-lg">
                    <div className="py-3 px-6">
                        <h2 className="text-left mt-24 font-medium leading-tight text-3xl mt-0 mb-2">Contact Information</h2>
                        <p className='text-base'>Fill the form and we will be with you in next 5 minutes</p>
                    </div>
                    <div className="p-6">
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Phone fontSize='large' />
                                </ListItemAvatar>
                                <ListItemText primary="Call Us" secondary="+91 9560827338" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Mail fontSize='large' />
                                </ListItemAvatar>
                                <ListItemText primary="Email" secondary="info@elderholidays.com" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Location fontSize='large' />
                                </ListItemAvatar>
                                <ListItemText primary="Location" secondary="1/4929, Lane No. 9, Balbirnagar Ext., Shahdara, New Delhi 110032" />
                            </ListItem>
                        </List>
                    </div>
                    <div className="py-3 px-6 text-gray-600">
                        <h4 className='px-5'>Follow Us</h4>
                        <p>
                            <a rel='noreferrer' target='_blank' href='https://www.facebook.com/profile.php?id=100063723653913'><Facebook style={{ color: 'black' }} fontSize='large' /> </a>
                            <a rel='noreferrer' target='_blank' href='https://instagram.com/elderholidays?igshid=OTJlNzQ0NWM='><Instagram style={{ color: 'black' }} fontSize='large' /> </a>
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ContactCard;