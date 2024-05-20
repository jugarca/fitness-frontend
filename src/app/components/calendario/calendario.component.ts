import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Inject,
  LOCALE_ID,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CalendarEventService } from 'src/app/services/calendarEvent.service';
import { TranslocoService } from '@ngneat/transloco';

// 1. Se crean el juego de colores que usaremos en el calendario.
const colors: Record<string, EventColor> = {
  red: {
    
    primary: '#b03361',
    secondary: '#ebc1d0',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#b08233',
    secondary: '#d6c19d',
  },
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {

  // 2. Se crean las variables necesarias para el calendario.
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  // 3. Variable para las diferentes vistas del calendario. Por defecto la del mes
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  // 4. Se crea el array de eventos del calendario
  calendarEvents: CalendarEvent[] = []; 

  // 5. Se crea la variable que contendrá la fecha actual
  viewDate: Date = new Date();

  // 6. Se crea la variable que contendrá los datos del modal
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  locale: string = 'es';


  // 7. Constructor que recibe los eventos del calendario desde el servicio.
  constructor(private calendarEventService:CalendarEventService, private translocoService: TranslocoService) {
    calendarEventService.getByUserId(Number(sessionStorage.getItem('id'))).subscribe(data => {
      console.log(data);
      
      this.calendarEvents = this.transformEvents(data);
      this.events = this.calendarEvents;
      this.locale = this.translocoService.getActiveLang();
    });
  }

 // 8. Función que transforma los eventos del calendario para que se muestren correctamente.
 transformEvents(events: any[]): any[] {

  return events.map(event => {
    let colorValue = event.color;
    if (event.color === 'RED') {
      colorValue = colors['red'];
    } else if (event.color === 'YELLOW') {
      colorValue = colors['yellow'];
    }
    return {
      start: startOfDay(new Date(event.start)),
      end: startOfDay(new Date(event.end)),
      title: event.title,
      color: colorValue,
      allDay: true,
    };
  });
  }

  // 9. Función que se encarga de abrir el modal con los datos del evento.
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}


