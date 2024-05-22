require("dotenv").config();
const { google } = require("googleapis");
const dayjs = require("dayjs");
const { v4: uuid } = require("uuid");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_SECRET_CLIENT,
  process.env.GOOGLE_CALENDAR_REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const calendar = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDAR_API_KEY,
});

const createGoogleMeetEvent = async (patient_email, consult_reason, date) => {
  // the doctor, by default, is the creator, so that the doctor email is authenticated (oauth2Client)
  // date = 2024-12-12 12:00:00
  const { data } = await calendar.events.insert({
    calendarId: "primary",
    auth: oauth2Client,
    conferenceDataVersion: 1,
    requestBody: {
      summary: "Health Link | Meet Consult",
      description: consult_reason,
      start: {
        dateTime: dayjs(date).toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      end: {
        dateTime: dayjs(date).add(30, "minutes").toISOString(),
        timeZone: "America/Argentina/Buenos_Aires",
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [
        {
          email: patient_email,
        },
        {
          email: "healthlink68@gmail.com",
        },
      ],
    },
  });

  return `https://meet.google.com/${data.conferenceData.conferenceId}`;
  // return {
  //   consult_reason: data.description,
  //   link: `https://meet.google.com/${data.conferenceData.conferenceId}`,
  //   date: data.start.dateTime,
  //   doctor_email: data.creator.email,
  //   patient_email: data.attendees[1].email,
  // };
};

module.exports = {
  oauth2Client,
  scopes,
  calendar,
  createGoogleMeetEvent,
};
