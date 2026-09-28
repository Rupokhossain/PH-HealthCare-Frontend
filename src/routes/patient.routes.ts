
const prefix = "/dashboard"

export const patientRoutes = [
    {
      title: "Bookings",
      items: [
        {
          title: "Overview",
          url: `${prefix}`,
        },
        {
          title: "My Appointments",
          url: `${prefix}`,
        },
      ],
    },
    {
      title: "App Settings",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
      
      ],
    },

  ]