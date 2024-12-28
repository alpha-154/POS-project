"use client";
import SubNavbar from "./_components/sub-navbar/SubNavbar";
import SellPage from "./_components/SellPage";

export default function Home() {
  return (
    <>
      <SubNavbar />
      <div className="min-h-screen max-w-7xl mx-auto mt-10 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
        <SellPage />
      </div>
    </>
  );
}
