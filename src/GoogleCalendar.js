
import React from 'react';

function GoogleCalendar() {
  var gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
    var CLIENT_ID =
    "922443255209-lbf01dsi04ara09joauio5hvav4hn053.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAtraYTAe0seK27XigiQaeLDDc7gRragUg";

  var DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
 
  var SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('script loaded!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: 'Awesome Event!',
            location: '800 Howard St., San Francisco, CA 94103',
            description: 'Really great refreshments',
            start: {
              dateTime: new Date(new Date().getTime() + 1 * 60000),
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: new Date(new Date().getTime() + 3 * 60000),
              timeZone: 'America/Los_Angeles',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [
              { email: 'lpage@example.com' },
              { email: 'sbrin@example.com' },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 1 },
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute((event) => {
            console.log(event);
            window.open(event.htmlLink);
          });

          // get events
          gapi.client.calendar.events
            .list({
              calendarId: 'primary',
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: 'startTime',
            })
            .then((response) => {
              const events = response.result.items;
              console.log('EVENTS: ', events);
            });
        }).catch(err => {
          console.log("error aata:",err);
        })
    });
  };

  return (
        <button  onClick={handleClick}>
          Add Event 
        </button>
  );
}

export default GoogleCalendar;