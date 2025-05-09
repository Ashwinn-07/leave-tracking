import { Calendar, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-24 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Simplify Your{" "}
              <span className="text-blue-600">Time and Leave</span> Management
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A comprehensive solution for requesting leave, tracking time, and
              managing approvals all in one place for your organization.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Leave Request</h3>
                  <p className="text-sm text-gray-500">Vacation • 5 days</p>
                </div>
                <div className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Approved
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Start Date</span>
                  <span className="text-gray-900 font-medium">
                    June 15, 2025
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">End Date</span>
                  <span className="text-gray-900 font-medium">
                    June 19, 2025
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span>Automatically excludes weekends & holidays</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
