import { AppBar, Button, Container, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar >
                    <Grid container spacing={1} sx={{ width: '100%' }} >

                        {/* Reducimos de 2 a 1 para hacer espacio */}
                        <Grid size={{xs:12, md:1, lg:1}}>        
                            <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Inicio</Link>
                        </Grid>

                        <Grid size={{xs:12, md:1, lg:1}}>        
                            <Link to={'/gestos'} style={{textDecoration:'none', color:'white'}}>Gestos</Link>
                        </Grid>
 
                        <Grid size={{xs:12, md:3, lg:3}}>        
                            <Link to={'/vozej1'} style={{textDecoration:'none', color:'white'}}>Voz: ejemplo básico</Link>
                        </Grid>

                        <Grid size={{xs:12, md:3, lg:3}}>        
                            <Link to={'/vozej2'} style={{textDecoration:'none', color:'white'}}>Voz: comandos</Link>
                        </Grid>

                        <Grid size={{xs:12, md:1, lg:1}}>        
                            <Link to={'/ar'} style={{textDecoration:'none', color:'white'}}>AR</Link>
                        </Grid>

                        <Grid size={{xs:12, md:3, lg:3}}>        
                            <Link to={'/ar-alejandro'} style={{textDecoration:'none', color:'white'}}>AR Alejandro</Link>
                        </Grid>

                    </Grid>
                </Toolbar >
            </Container>
        </AppBar>
      
    );
}

export default Dashboard;