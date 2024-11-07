export const noValidation = [
    {
        required: false,
        message: ""
    }
];

export const noMessageValidation = [
    {
        required: true,
        message: ""
    }
];

export const generalValidation = [
    {
        language: "id",
        fieldRules: [{
            required: true,
            message: "Tidak boleh kosong!"
        }]
    },
    {
        language: "en",
        fieldRules: [{
            required: true,
            message: "Cannot be empty!"
        }]
    }
];

export const emailValidation = [
    {
        language: "id",
        fieldRules: [
            {
                type: 'email',
                message: 'e-Mail tidak valid!',
            },
            {
                required: true,
                message: 'e-Mail tidak boleh kosong!',
            },
        ]
    },
    {
        language: "en",
        fieldRules: [
            {
                type: 'email',
                message: 'Not a valid e-Mail!',
            },
            {
                required: true,
                message: 'e-Mail cannot be empty!',
            },
        ]
    }
];

export const phoneNumberValidation = [
    {
        language: "id",
        fieldRules: [
            {
                required: true,
                message: 'Nomor telepon tidak boleh kosong!',
            },
            {
                pattern: /^[0-9]*$/,
                message: 'Nomor telepon tidak valid!',
            },
            {
                min: 10,
                max: 13,
                message: 'Wajib 10 sampai 13 karakter!',
            },
        ]
    },
    {
        language: "en",
        fieldRules: [
            {
                required: true,
                message: 'Phone number cannot be empty!',
            },
            {
                pattern: /^[0-9]*$/,
                message: 'Not a valid phone number!',
            },
            {
                min: 10,
                max: 13,
                message: 'Phone number must be between 10 and 13 characters long!',
            },
        ]
    }
];

export const idCardValidation = [
    {
        language: "id",
        fieldRules: [
            {
                required: true,
                message: 'Kartu identitas tidak boleh kosong!',
            },
            {
                pattern: /^[0-9]*$/,
                message: 'Kartu identitas tidak valid!',
            },
            {
                min: 16,
                max: 16,
                message: 'Wajib 16 karakter!',
            },
        ]
    },
    {
        language: "en",
        fieldRules: [
            {
                required: true,
                message: 'Id card cannot be empty!',
            },
            {
                pattern: /^[0-9]*$/,
                message: 'Not a valid id card!',
            },
            {
                min: 16,
                max: 16,
                message: 'Id card must be 16 characters long!',
            },
        ]
    }
];

export const urlValidation = [
    {
        language: "id",
        fieldRules: [
            {
                type: 'url',
                message: 'URL tidak valid!',
            },
            {
                required: true,
                message: 'URL tidak boleh kosong!',
            },
        ]
    },
    {
        language: "en",
        fieldRules: [
            {
                type: 'url',
                message: 'Not a valid URL!',
            },
            {
                required: true,
                message: 'URL cannot be empty!',
            },
        ]
    }
];

export const passwordValidation = [
    {
        language: "id",
        fieldRules: [
            {
                required: true,
                message: 'Password tidak boleh kosong!',
            },
            {
                pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                message: 'Password tidak valid!',
            },
        ]
    },
    {
        language: "en"
    }
];