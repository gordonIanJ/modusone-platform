export const cascaderState = {

    hospitals: [
        {
            value: 'ballard',
            label: 'Ballard',
            children: [
            {
                value: 'JORIELLE R BAUTISTA MD',
                label: 'JORIELLE R BAUTISTA MD'
            },
            {
                value: 'EILEEN E. CHANG ARNP',
                label: 'EILEEN E. CHANG ARNP'
            }

            ]
        }, 
        {
            value: 'downtown',
            label: 'Downtown',
            children: [
            {
                value: 'JENNA L. GREEN ARNP',
                label: 'JENNA L. GREEN ARNP'
            },
            {
                value: 'MARK O MCCABE MD',
                label: 'MARK O MCCABE MD'
            }
            ]
        }
    ],
  
    providers: {
        ballard: [
            {
                value: 'JORIELLE R BAUTISTA MD',
                label: 'JORIELLE R BAUTISTA MD'
            },
            {
                value: 'EILEEN E. CHANG ARNP',
                label: 'EILEEN E. CHANG ARNP'
            }
        ],
        downtown: [
            {
                value: 'JENNA L. GREEN ARNP',
                label: 'JENNA L. GREEN ARNP'
            },
            {
                value: 'MARK O MCCABE MD',
                label: 'MARK O MCCABE MD'
            }
        ]
    },
    
    diagnoses: [
        {
            value: 'Omitted',
            label: 'Omitted'
        },
        {
            value: 'Misdiagnosed',
            label: 'Misdiagnosed'

        },
        {
            value: 'Criteria Unmet',
            label: 'Criteria Unmet'
        },
        {
            value: 'Accurate',
            label: 'Accurate'
        }
    ], 
    
    conditions: [
        {
            value: 'Major Depressive Disorder',
            label: 'Major Depressive Disorder',
            children: [
                {
                    value: 'Single',
                    label: 'Single',
                    children: [
                        {
                            value: 'Present',
                            label: 'Present'
                        },
                        {
                            value: 'Remiss',
                            label: 'Remiss'
                        }
                    ]
                },
                {
                    value: 'Recurrent',
                    label: 'Recurrent',
                    children: [
                        {
                            value: 'Present',
                            label: 'Present'
                        },
                        {
                            value: 'Remiss',
                            label: 'Remiss'
                        }
                    ]

                }
            ]
        }, {
            value: 'Chronic Kidney Disease',
            label: 'Chronic Kidney Disease',
        }, {
            value: 'Diabetes',
            label: 'Diabetes',
            children: [
                {
                    value: 'Type 1',
                    label: 'Type 1'
                },
                {
                    value: 'Type 2',
                    label: 'Type 2'
                }
            ]
        }, {
            value: 'Morbid Obesity',
            label: 'Morbid Obesity',
        }, {
            value: 'Drug Dependence',
            label: 'Drug Dependence',
            children: [
                {
                    value: 'Active',
                    label: 'Active'
                },
                {
                    value: 'Remiss',
                    label: 'Remiss'
                }
            ]
        }

    ],

}