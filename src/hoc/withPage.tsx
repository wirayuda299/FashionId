interface Props {
  page: string;
  hidden: boolean;
  setHidden: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const withPage = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P & Props) => {
    return <WrappedComponent {...props} />;
  };
};
