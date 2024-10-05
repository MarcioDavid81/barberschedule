import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import styles from './calendar.module.scss';
import { Flex } from '@chakra-ui/react';
import eventosPadrao from './eventosPadrao';
import EventModal from './EventModal';
import 'moment/locale/pt-br';


const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {

  const [eventos, setEventos] = useState(eventosPadrao);

  const [ eventoSelecionado, setEventoSelecionado ] = useState(null);

  const handleEventClick = (event) => {
    setEventoSelecionado(event);
  };
  const handleEventClose = () => {
    setEventoSelecionado(null);
  };

  const eventStyle = (event) => ({
    style:{
      backgroundColor: event.color,
    },
  });


  return (
    <>
      <Flex direction='column' w='100%' mt='4'>
        <DragAndDropCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          localizer={localizer}
          events={eventos}
          resizable
          onEventDrop={({ event, start, end }) => {
            const idx = eventos.indexOf(event);
            const updatedEvent = { ...event, start, end };
            const nextEvents = [...eventos];
            nextEvents.splice(idx, 1, updatedEvent);
            setEventos(nextEvents);
          }}
          onEventResize={({ event, start, end }) => {
            const idx = eventos.indexOf(event);
            const updatedEvent = { ...event, start, end };
            const nextEvents = [...eventos];
            nextEvents.splice(idx, 1, updatedEvent);
            setEventos(nextEvents);
            }
          }
          eventPropGetter={eventStyle}
          className={styles.calendar}
          onSelectEvent={handleEventClick}
        />
        {eventoSelecionado && (
          <EventModal event={eventoSelecionado} onClose={handleEventClose} />
        )}
      </Flex>
    </>
  )
}

export default Calendario;
