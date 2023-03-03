import * as React from 'react';
// material-ui
import { Button, TextField, Grid } from '@mui/material';
import { Lectorjs, Guardar } from './lector';
import './estilo.css';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| PAGINA DE GESTION ARFSIS ||============================== //

const LectorPdfRefcon = () => {
    const [seguro, setseguro] = React.useState('');
    const [numero, setnumero] = React.useState('');
    const [hora, sethora] = React.useState('');
    const [fecha, setfecha] = React.useState('');
    const [contrato, setcontrato] = React.useState('');
    const [historia, sethistoria] = React.useState('');
    const [documento, setdocumento] = React.useState('');
    const [apepaterno, setapepaterno] = React.useState('');
    const [apematerno, setapematerno] = React.useState('');
    const [nombres, setnombres] = React.useState('');
    const [departamento, setdepartamento] = React.useState('');
    const [provincia, setprovincia] = React.useState('');
    const [distrito, setdistrito] = React.useState('');
    // const [ipressorigen, setipressorigen] = React.useState('');
    // const [ipressdestino, setipressdestino] = React.useState('');
    const [upsorigen, setupsorigen] = React.useState('');
    const [upsdestino, setupsdestino] = React.useState('');
    const [anamesis, setanamesis] = React.useState('');
    const [examenfisico, setexamenfisico] = React.useState('');
    const [diagnostico1, setdiagnostico1] = React.useState('');
    const [tipodiag1, settipodiag1] = React.useState('');
    const [especialidaddestino, setespecialidaddestino] = React.useState('');
    const CargarPDF = async () => {
        const data = await Lectorjs();
        console.log(data);
        if (data) {
            const {
                seguro,
                numero,
                hora,
                contrato,
                historia,
                documento,
                apepaterno,
                apematerno,
                nombres,
                provincia,
                departamento,
                distrito,
                upsorigen,
                anamesis1,
                anamesis2,
                examenfisico,
                diagnostico1,
                tipodiag1,
                especialidaddestino,
                fechadia,
                fechames,
                fechaperiodo
            } = data;
            setfecha(`${fechames}-${fechames}-${fechaperiodo}`);
            setseguro(seguro);
            setnumero(numero);
            sethora(hora);
            setcontrato(contrato);
            sethistoria(historia);
            setdocumento(documento);
            setapepaterno(apepaterno);
            setapematerno(apematerno);
            setnombres(nombres);
            setprovincia(provincia);
            setdepartamento(departamento);
            setdistrito(distrito);
            setupsorigen(upsorigen);
            setupsdestino(upsdestino);
            setanamesis(`${anamesis1} ${anamesis2}`);
            setexamenfisico(examenfisico);
            setdiagnostico1(diagnostico1);
            settipodiag1(tipodiag1);
            setespecialidaddestino(especialidaddestino);
        }
    };
    const GuardarDatos = async () => {
        Guardar(numero);
        setfecha('');
        setseguro('');
        setnumero('');
        sethora('');
        setcontrato('');
        sethistoria('');
        setdocumento('');
        setapepaterno('');
        setapematerno('');
        setnombres('');
        setprovincia('');
        setdepartamento('');
        setdistrito('');
        setupsorigen('');
        setupsdestino('');
        setanamesis('');
        setexamenfisico('');
        setdiagnostico1('');
        settipodiag1('');
        setespecialidaddestino('');
    };

    return (
        <MainCard title="Lector PDF (Refcon Minsa)">
            <div className="file-input">
                <input name="refconfile" id="refconfile" type="file" accept="application/pdf" onChange={CargarPDF} />
                <span className="button">Archivo</span>
                <span className="label" data-js-label>
                    Seleccione el archivo PDF
                </span>
            </div>
            <Grid container spacing={2} item xs={12} md={12}>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="seguro"
                        name="seguro"
                        onChange={(e) => setseguro(e.target.value)}
                        value={seguro}
                        label="Tipo de Seguro"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="numero"
                        name="numero"
                        onChange={(e) => setnumero(e.target.value)}
                        value={numero}
                        label="Nº Referencias"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fecha"
                        name="fecha"
                        onChange={(e) => setfecha(e.target.value)}
                        value={fecha}
                        label="Fecha Referencia"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hora"
                        name="hora"
                        onChange={(e) => sethora(e.target.value)}
                        value={hora}
                        label="Hora"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contrato"
                        name="contrato"
                        onChange={(e) => setcontrato(e.target.value)}
                        value={contrato}
                        label="Contrato"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="historia"
                        name="historia"
                        onChange={(e) => sethistoria(e.target.value)}
                        value={historia}
                        label="Historia"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="documento"
                        name="documento"
                        onChange={(e) => setdocumento(e.target.value)}
                        value={documento}
                        label="Documento"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="apepaterno"
                        name="apepaterno"
                        onChange={(e) => setapepaterno(e.target.value)}
                        value={apepaterno}
                        label="Apellido Paterno"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="apematerno"
                        name="apematerno"
                        onChange={(e) => setapematerno(e.target.value)}
                        value={apematerno}
                        label="Apellido Materno"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombres"
                        name="nombres"
                        onChange={(e) => setnombres(e.target.value)}
                        value={nombres}
                        label="Nombres Completos"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="departamento"
                        name="departamento"
                        onChange={(e) => setdepartamento(e.target.value)}
                        value={departamento}
                        label="Departamento"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="provincia"
                        name="provincia"
                        onChange={(e) => setprovincia(e.target.value)}
                        value={provincia}
                        label="Provincia"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="distrito"
                        name="distrito"
                        onChange={(e) => setdistrito(e.target.value)}
                        value={distrito}
                        label="Distrito"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="upsorigen"
                        name="upsorigen"
                        onChange={(e) => setupsorigen(e.target.value)}
                        value={upsorigen}
                        label="UPS Origen"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="upsdestino"
                        name="upsdestino"
                        onChange={(e) => setupsdestino(e.target.value)}
                        value={upsdestino}
                        label="UPS Destino"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="diagnostico1"
                        name="diagnostico1"
                        onChange={(e) => setdiagnostico1(e.target.value)}
                        value={diagnostico1}
                        label="Diagnostico"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tipodiag1"
                        name="tipodiag1"
                        onChange={(e) => settipodiag1(e.target.value)}
                        value={tipodiag1}
                        label="Tipo Diagnostico"
                        type="text"
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="anamesis1"
                        name="anamesis"
                        onChange={(e) => setanamesis(e.target.value)}
                        value={anamesis}
                        label="Anemesis"
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="examenfisico"
                        name="examenfisico"
                        onChange={(e) => setexamenfisico(e.target.value)}
                        value={examenfisico}
                        label="Examen Fisico"
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="especialidaddestino"
                        name="especialidaddestino"
                        onChange={(e) => setespecialidaddestino(e.target.value)}
                        value={especialidaddestino}
                        label="Especialidad"
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ autoComplete: 'off' }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button color="success" onClick={() => GuardarDatos(numero)}>
                        Guardar Registro
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default LectorPdfRefcon;
