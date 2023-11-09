import withModal from "hoc/withModal";
import withHistory from "hoc/withHistory";
import LayoutView from "./LayoutView";

const LayoutContainer = ({ children }: any) => {
  const obj = {};
  return (
    <>
      <LayoutView {...obj}>{children}</LayoutView>
    </>
  );
};

export default withHistory(withModal(LayoutContainer));
