import Sidebar from "./Sidebar";

export const HomeLayout = (props: { children?: React.ReactNode }) => (
  <>
    <Sidebar />
    <main className="py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
    </main>
  </>
);
export default HomeLayout;
