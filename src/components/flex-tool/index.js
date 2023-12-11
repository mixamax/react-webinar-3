import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function FlexTool({ children }) {
  const cn = bem("flex-tool");
  return <div className={cn()}>{children}</div>;
}

export default memo(FlexTool);
