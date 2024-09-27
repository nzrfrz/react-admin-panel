
export const RenderFormValue = ({value}: {value: string | string[] | undefined}) => {

    if (value === "" || value?.length === 0 || value === undefined) return null;
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span>Form Value: </span>
            <pre>{JSON.stringify(value, null, 2)}</pre>
        </div>
    );
};