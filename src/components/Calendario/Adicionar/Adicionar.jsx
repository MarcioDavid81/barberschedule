import React, { useState } from "react";
import { Button, Form, Row, Col, Collapse } from "react-bootstrap";


function Adicionar({onAdicionar}){

    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '',
        end: '',
        desc: '',
        color: '',
        tipo: '',
    });
    const [expanded, setExpanded] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNovoEvento({...novoEvento, [name]: value});
    }

    const handleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    }

    return (
        <div className="adicionar p-3 rounded border border-white">
            <h3>Adicionar Evento</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Adicionar;