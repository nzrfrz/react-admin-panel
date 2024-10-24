# React Admin Panel

Admin panel with react typescript, antd and antd-mobile as UI library.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Routing

This project using `react-router-dom` to routing between pages.  And the route file is in `src/routes/`.  The detail explanation about every file inside the routes folder is below:

File Name | Description
---- | ----
MainRoutes.tsx | Use to pool all routes from route registry by using a javascript `.map` function to list all path and pages label in route registry, and call it inside `App.tsx`.
PrivateRoute.tsx | Use to wrap route registry except `PublicRouteRegistry.tsx`, and apply the user auth logic.
PublicRoute.tsx | Wrap `PublicRouteRegistry.tsx` and also apply auth logic.
SidebarRouteRegistry.tsx | Register the route page with javascript array of object format.  It will be called in antd layout component as a [sidebar menu](https://ant.design/components/menu?theme=dark) in the admin panel page (Private Route).
OtherRouteRegistry.tsx | Page that does not need to be shown inside `sidebar menu` as long as it is part of the `private route`.
PublicRouteRegistry.tsx | This registry will be outside the `private route`, like landing page route pages, login, register.

### Route Registry Props
key | value
---- | ----
key | string (recommended using lower and snakeCase)
label | LinkProps or string or null (set this to string if `children` is not empty)
path | path string ("/dashboard")
isIndex | boolean
element | React.FC or JSX.Element or null (set this to `null` if `children` is not empty)
icon | React.FC or JSX.Element (antd icons, react icons)
children | `[this object props]` (set to `undefined` if does not need a children)

## Components
Reusable component based from antd ui component with custom props to make it easy to use on every page inside the project.

#### Form Item - InputForm
- Custom Component Props
props | value
---- | ----
inputMode | string > `general`, `email`, `phoneNumber`, `idCard`, `url`
countryCode | string > `inputMode` must be `phoneNumber`
- Usage
```javascript
<Form form={form} layout="vertical" scrollToFirstError wrapperCol={{ span: 24 }} style={{ width: "100%" }}
    onFinish={onSubmitForm}>
    <InputForm name="username" label="Username" requiredMark={true} />
</Form>
```
#
#### Form Item - SelectForm
- Custom Component Props
props | value
---- | ----
selectMode | string > `single`, `multiple`,
selectOptions | array > [ {label: string, value: string, slug: string} ]
- Usage
```javascript
<Form form={form} layout="vertical" scrollToFirstError wrapperCol={{ span: 24 }} style={{ width: "100%" }}
      onFinish={onSubmitForm}>
  <SelectForm
    name={"fruits"}
    label="Fruit(s)"
    allowClear={true}
    showSearch={true}
    requiredMark={true}
    hideSelected={true}
    selectOptions={selectOptionsData}
    selectMode={"multiple}
  />
</Form>
```
#
#### Form Item - PasswordForm
- Custom Component Props
props | value
---- | ----
withConfirmPassword | boolean
useStrictPassword | booelan
- Usage
```javascript
<Form form={form} layout="vertical" scrollToFirstError wrapperCol={{ span: 24 }} style={{ width: "100%" }}
      onFinish={onSubmitForm}>
    <PasswordForm
        requiredMark={true}
        withConfirmPassword={true}
        useStrictPassword={true}
    />
</Form>
```
#
#### Form Item - InputNumberForm
- Custom Component Props
props | value
---- | ----
inputMode | string > `general`, `currency`
- Usage
```javascript
<Form form={form} layout="vertical" scrollToFirstError wrapperCol={{ span: 24 }} style={{ width: "100%" }}
      onFinish={onSubmitForm}>
    <InputNumberForm
        name="qty"
        label="Quantity"
        min={0}
        max={15}
        requiredMark={true}
        addonBefore={"Qty"}
    />
</Form>
```
#
#### Form Item - DatePickerForm
- Custom Component Props
props | value
---- | ----
pickerMode | string > `single`, `range`
- Usage
```javascript
<Form form={form} layout="vertical" scrollToFirstError wrapperCol={{ span: 24 }} style={{ width: "100%" }}
      onFinish={onSubmitForm}>
      <DatePickerForm
          name="pickedDate"
          label="Pick Any Date"
          required={true}
          showTime={showTime}
          pickerMode="range"
      />
</Form>
```
#
##### Form Item - TextAreaForm
- Usage
```javascript
<Form form={form} layout="vertical" scrollToFirstError wrapperCol={{ span: 24 }} style={{ width: "100%" }}
      onFinish={onSubmitForm}>
    <TextAreaForm
        name="description"
        label="Description"
    />
</Form>
```
#
#### UploadField
- Component Props
props | value
---- | ----
docType | `.csv`, `.txt`, `.json`, `.pdf`, `.xlsx`, `.docx`, `.pptx`, undefined.  Mandatory if `toUploadFileType` is set to `non-image`
previewImage | `boolean` show the image preview or not, `false` if `toUploadFileType` set to `non-image`
toUploadFileType | `image`, `non-image`
uploadResults | left side hook state
setUploadResults | right side hook state
uploadApiEndpoint | `string` url to upload the file
deleteApiEndpoint | `string` url to delete the file

- Usage
```javascript
<UploadField
  docType={docType as nonImageAllowedFileType}
  previewImage={imageWithPreview}
  toUploadFileType={uploadFileType}
  uploadResults={uploadResults}
  setUploadResults={setUploadResults}
  uploadApiEndpoint={uploadEndpoint}
  deleteApiEndpoint={deleteEndpoint}
/>
```