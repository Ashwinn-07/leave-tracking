import React from "react";
import {
  Calendar,
  Clock,
  FileText,
  Bell,
  Users,
  BarChart3,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Leave Management",
      description:
        "Request time off with an intuitive interface that automatically calculates leave days excluding weekends and holidays.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Time Tracking",
      description:
        "Record and monitor work hours with ease, including overtime and special work arrangements.",
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Approval Workflow",
      description:
        "Streamlined approval process with role-based permissions for managers and administrators.",
    },
    {
      icon: <Bell className="h-6 w-6 text-blue-600" />,
      title: "Notifications",
      description:
        "Receive timely email notifications about leave requests, approvals, and important updates.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Role-Based Access",
      description:
        "Different dashboards and permissions for employees, managers, and administrators.",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Reports & Analytics",
      description:
        "Generate comprehensive reports on leave balances, attendance patterns, and team availability.",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our Time and Leave Tracking System streamlines employee leave
            management while providing powerful tools for time tracking and
            reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
