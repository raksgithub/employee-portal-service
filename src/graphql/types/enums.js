import { GraphQLEnumType } from 'graphql';

export const PlatformEnumType = new GraphQLEnumType({
    name: 'PlatformEnum',
    description: 'This is platform enum type.',
    values: {
        WEB: { value: 'Web' },
        ANDROID: { value: 'Android' },
        IOS: { value: 'iOS' },
        DESKTOP: { value: 'Desktop' }
    }
});

export const DayEnumType = new GraphQLEnumType({
    name: 'DayEnum',
    description: 'This is day enum type.',
    values: {
        MONDAY: { value: 'Monday' },
        TUESDAY: { value: 'Tuesday' },
        WEDNESDAY: { value: 'Wednesday' },
        THURSDAY: { value: 'Thursday' },
        FRIDAY: { value: 'Friday' },
        SATURDAY: { value: 'Saturday' },
        SUNDAY: { value: 'Sunday' }
    }
});

export const MonthEnumType = new GraphQLEnumType({
    name: 'MonthEnum',
    description: 'This is month enum type',
    values: {
        JANUARY: { value: 'January' },
        FEBRUARY: { value: 'February' },
        MARCH: { value: 'March' },
        APRIL: { value: 'April' },
        MAY: { value: 'May' },
        JUNE: { value: 'June' },
        JULY: { value: 'July' },
        AUGUST: { value: 'August' },
        SEPTEMBER: { value: 'September' },
        OCTOBER: { value: 'October' },
        NOVEMBER: { value: 'November' },
        DECEMBER: { value: 'December' }
    }
});
