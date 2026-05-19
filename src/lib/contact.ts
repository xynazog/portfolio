/**
 * Single source of truth for contact info. Rendered on the page as a
 * syntax-highlighted JSON document and served at /.well-known/contact.json
 * as a real endpoint. Update this one file, both surfaces update together.
 */

export interface Contact {
  issuer: string;
  subject: {
    name: string;
    role: string;
    location: string;
  };
  endpoints: {
    email: string;
    linkedin: string;
    github: string;
  };
  scopes_supported: string[];
  audience: string[];
  response_time: string;
}

export const contact: Contact = {
  issuer: "https://ankitbhagat.com",
  subject: {
    name: "Ankit Bhagat",
    role: "Engineering Manager",
    location: "San Francisco Bay Area",
  },
  endpoints: {
    email: "mailto:hello@ankitbhagat.com",
    linkedin: "https://linkedin.com/in/xynazog",
    github: "https://github.com/xynazog",
  },
  scopes_supported: ["EM", "PM", "Staff Eng"],
  audience: ["AI labs", "product companies"],
  response_time: "usually within a day",
};

/** Strip mailto: prefix for display, while keeping it on the href. */
export function displayEndpoint(value: string): string {
  return value.replace(/^mailto:/, "");
}
