import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContactCard from './Card/ContactCard';
import ContactForm from './Form/ContactForm';

export default function FullWidthGrid() {
    return (
        <Box margin={5} sx={{ flexGrow: 1 }} >
            <Grid style={{ justifyContent: "center" }} justifyContent="center"
                alignItems="center" container spacing={2} gap={4}>
                <Grid item xs={10} lg={5}>
                    <ContactCard />
                </Grid>
                <Grid item xs={10} lg={5}>
                    <ContactForm />
                </Grid>

            </Grid>
        </Box>
    );
}