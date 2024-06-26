import React from "react";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid"
import { useTheme } from "@emotion/react";
import { tokens } from "./theme";
import Typography from '@mui/material/Typography';

import { Box, List, ListItem, ListItemText} from "@mui/material";
import { formatDate } from "@fullcalendar/core";


function Calendar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `are you sure you want to delete the event'${selected.event.title}'`
      )
    ) {
     selected.event.remove();
        }
      
  };
  return <Box m= "20px">
    
    <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 20%" bgcolor={colors.primary[400]} p="15px" borderRadius="4px">
            < Typography variant="h5">Events</Typography>
            <List>
                {currentEvents.map((event)=>(
                    <ListItem
                    key={event.id}
                    sx={{
                        backgroundColor:colors.greenAccent[500],
                        margin: '10px 0',
                        borderRadius: '2px',
                        
                    }}>
                        <ListItemText 
                        primary={event.title}
                        secondary={
                            <>
                                {formatDate(event.start,{
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </>
                        }/>
                    </ListItem>
                ))}
            </List>
        </Box>
        <Box flex="1 1 100% " ml="15px" >
            
            <FullCalendar
                height="85vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin

                ]}
                

                headerToolbar = {{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events)=>setCurrentEvents(events)}
                
            />
            
        </Box>
    </Box>

  </Box>;
}

export default Calendar;
