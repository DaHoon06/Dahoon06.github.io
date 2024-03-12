---
layout: post
title: "NestJS Unit Test 하기 "
summary: "우물 안의 개구리 탈출"
author: dahoon06
date: "2024-03-12 00:00:00 +0530"
category: development
thumbnail: 
keywords: NejstJS Jest UnitTesting
permalink: /blog/development/2024-03-12-NestJS-Jest/
usemathjax: true
---

늘 유닛 테스트에 대한 관심은 있었지만 막상 프로젝트 내에 어떻게 녹여내야할지 고민이 많았다. 그래서 조그만한 프로젝트 내에서 혼자 작성해본게 다였는데 이번에 한 번 Jest를 도입해보기로 했다.

팀에서의 백엔드는 NestJS를 사용하고 있고, cli로 설치 시에 기본적으로 Jest가 함께 설치된다.

나는 import 경로를 alias path를 사용하고 있다. 그렇다면 Jest 설정도 동일한 alias path로 설정해줘야 한다.

```json
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "moduleNameMapper": {
      "^@decorators/(.*)$": "<rootDir>/decorators/$1",
      "^@filters/(.*)$": "<rootDir>/filters/$1",
      "^@interceptors/(.*)$": "<rootDir>/interceptors/$1",
      "^@modules/(.*)$": "<rootDir>/modules/$1",
      "^@config/(.*)$": "<rootDir>/config/$1",
      "^@common/(.*)$": "<rootDir>/common/$1",
      "^@utils/(.*)$": "<rootDir>/utils/$1"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "setupFiles": [
      "<rootDir>/../jest.setup.ts"
    ]
  }
}
```

그리고 env 파일을 사용하기 위해 root 위치에 jest.setup.ts 파일을 생성해 주었다.

```typescript
// jest.setup.ts
import * as dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/.env_test`,
});
```

테스팅 준비는 끝! 그렇다면 이제 뭘 해야할까?

테스트 파일을 생성하고 그 안에 필요한 값을 준비해주고 내가 원하는 형태가 나올 때 까지 함수를 작성해주면 된다.

먼저 간단하게 시작 날짜와 종료 날짜를 전달 받고 남은 시간을 string 형태로 반환 해주는 함수를 테스트 해보겠다.

```typescript
// @utils/date.ts
/**
 * @param startDate
 * @param endDate
 * @description 설문 종료까지 남은 시간 구하기
 */
export const remainTime = (startDate: Date, endDate: Date): string => {
  return `분`  
};
```

```typescript
import { remainTime } from '@utils/date';

describe('utils/date.ts test case', () => {
  let remainTimeMock: jest.Mocked<string, [Date, Date]>;
  let expectedTime = '';
  
  beforeEach(() => {
    // 함수 초기화
    remainTimeMock = jest.fn(remainTime);
  });

  test('Retrun Value : 20 분', () => {
    const startDate = new Date('2024-02-08T11:32:32.029+09:00');
    const endDate = new Date('2024-02-08T11:52:32.029+09:00');
    
    expectedTime = '20 분'; // 원하는 데이터 : 20분

    expect(remainTimeMock(startDate, endDate)).toEqual(expectedTime);
  });
});
```

테스트 코드 작성이 끝이 났다 이 상태에서 스크립트를 실행시킨다면 당연 remainTime 함수가 비어 있기 때문에 실패하는 테스트가 된다.
이제 이 함수가 성공할 수 있도록 remainTime 함수 내용을 채워보자.


```typescript
// @utils/date.ts
/**
 * @param startDate
 * @param endDate
 * @description 설문 종료까지 남은 시간 구하기
 */
export const remainTime = (startDate: Date, endDate: Date): string => {
  const currentTime = startDate.getTime();
  const endTime = endDate.getTime();

  const remainMilliseconds = endTime - currentTime;

  const remainSecond = Math.floor(remainMilliseconds / 1000);
  const remainMinutes = Math.floor(remainSecond / 60); // 분으로 표현
  const remainHours = Math.floor(remainMinutes / 60); // 시간으로 표현
  const remainDays = Math.floor(remainHours / 24); // 하루로 표현

  // 시간, 분, 초를 남은 시간으로 변환
  const hoursRemainder = remainHours % 24;
  const minutesRemainder = remainMinutes & 60;

  if (remainDays > 0)
    return `${remainDays} 일 ${hoursRemainder} 시간 ${minutesRemainder} 분`;
  else if (hoursRemainder > 0)
    return `${hoursRemainder} 시간 ${minutesRemainder} 분`;
  else return `${minutesRemainder}분`; 
};
```

분에 따라 남은 기간을 표기하는 함수가 작성되었다. 위 테스트 케이스에서는 "분" 만 테스트 해보았는데 그렇다면 시간, 일은???

간단하다. 테스트 케이스를 추가하면된다.

```typescript
import { remainTime } from '@utils/date';

describe('utils/date.ts test case', () => {
  let remainTimeMock: jest.Mocked<string, [Date, Date]>;
  let expectedTime = '';
  
  beforeEach(() => {
    // 함수 초기화
    remainTimeMock = jest.fn(remainTime);
  });

  test('Retrun Value : 20 분', () => {
    const startDate = new Date('2024-02-08T11:32:32.029+09:00');
    const endDate = new Date('2024-02-08T11:52:32.029+09:00');
    
    expectedTime = '20 분'; // 원하는 데이터 : 20분

    expect(remainTimeMock(startDate, endDate)).toEqual(expectedTime);
  });

  test('Retrun Value : 2 시간 20 분', () => {
    const startDate = new Date('2024-02-08T11:32:32.029+09:00');
    const endDate = new Date('2024-02-08T13:52:32.029+09:00');

    expectedTime = '2 시간 20 분'; // 원하는 데이터 : 20분

    expect(remainTimeMock(startDate, endDate)).toEqual(expectedTime);
  });

  test('Retrun Value : 2 일 2 시간 20 분', () => {
    const startDate = new Date('2024-02-08T11:32:32.029+09:00');
    const endDate = new Date('2024-02-10T13:52:32.029+09:00');

    expectedTime = '2일 2 시간 20 분'; // 원하는 데이터 : 20분

    expect(remainTimeMock(startDate, endDate)).toEqual(expectedTime);
  });
});
```

지금까지는 함수를 테스트 했는데 그렇다면 NestJS에서의 모듈을 테스트 하는 방법은 어떻게 해야할까?

> 상황 : 설문 조사 등록을 위해 전달 받은 데이터를 가공하여 expectedData 형태로 가공하는 service 로직을 만들어야한다.
  데이터는 아래의 mockData 형태로 넘어온다면 이를 가공하여 expectedData 형태로 가공하여 저장해야한다.

```typescript
describe('프로젝트 등록에 사용될 demoGraphic 값을 구합니다.', () => {
  let quotaCalculationService: QuotaCalculationService;

  const mockData = {
    projectGender: ['전체'], // female, all
    projectLocation: ['전국'], // 전국 서울 인천/경기 / 지방5대광역시
    projectAge: {
      type: '10세단위', // age5 age10 ageAll
      ageValue: ['1', '2', '3', '4'],
    },
    projectQuotaTable: {
      label: [],
      body: [
        {
          label: '남성',
          quotaCount: ['25', '25', '25', '25'],
          total: '100',
        },
        {
          label: '여성',
          quotaCount: ['25', '25', '25', '25'],
          total: '100',
        },
      ],
    },
  };

  const expectedData = {
    age: [
      {
        min: 14,
        max: 19,
      },
      {
        min: 20,
        max: 24,
      },
      {
        min: 25,
        max: 29,
      },
      {
        min: 30,
        max: 34,
      },
    ],
    region: type1,
    gender: ['남성'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotaCalculationService],
    }).compile();

    quotaCalculationService = module.get<QuotaCalculationService>(
      QuotaCalculationService,
    );
  });

  test('project.data.service be defined', () => {
    expect(quotaCalculationService).toBeDefined();
  });

  test('전달 받은 demoGraphic 데이터를 변환한다.', () => {
    jest.spyOn(quotaCalculationService, 'makeDemoGraphicData');
    
    const result = quotaCalculationService.makeDemoGraphicData(mockData);
    expect(result).toEqual(expectedData);
  });
});
```

가상의 Testing Module을 만들고 그 안에 사용할 service의 의존 주입을 해주었다.

그렇게 되면 service 내의 함수에 접근할 수 있게 된다.

```typescript
/**
 * @description demoGraphic 데이터 변환
 * 필요한 정보 age[] => {min: 10, max: 19},
 * 필요한 정보 region[] => [서울, 부산]
 * 필요한 정보 gender[] => [남성, 여성]
 */
// 받아야하는 정보는 쿼터 정보
makeDemoGraphicData({
  projectGender,
  projectLocation,
  projectAge,
}: DemoGraphicParamDto): ProjectDemoGraphic {
  // 쿼터 초기 데이터
  const quotaInfo = quotaAgeInitialState.filter(
          (age) => age.target === projectAge.type,
  );
  const demoGraphic = {
    age: [],
    region: [],
    gender: [],
  };

  if (quotaInfo.length > 0) {
    const { detail } = quotaInfo[0]; // 값이 존재한다는 것은 데이터가 있는 것
    // age format
    demoGraphic.age = projectAge.ageValue.flatMap((age) => {
      return detail
              .map((detail) => {
                if (detail.value === age) {
                  const minmax = detail.label.split('~');
                  return {
                    min: Number(minmax[0]),
                    max: Number(minmax[1]),
                  };
                }
              })
              .filter((v) => v);
    });

    // gender
    demoGraphic.gender = projectGender.flatMap((gender: string) => {
      const all = gender === QuotaGenderType.ALL;
      if (all) return [Gender.MALE, Gender.FEMALE];
      else if (gender === QuotaGenderType.MALE) return [Gender.MALE];
      else return [Gender.FEMALE];
    });

    // location
    demoGraphic.region = this.getRegionData(projectLocation);
  }
  return demoGraphic;
}
```

지금은 service 내에서 다른 repository를 참조하고 있지 않지만 만약 참조를 하고 있다면 service와 동일하게 테스팅 모듈에 의존 주입을 해주어야한다.

```typescript
describe('restaurantService Test Case', () => {
  let service: RestaurantService;
  let repository: RestaurantRepository;
  let model: Model<RestaurantDocument>;
  
  // DB에 담긴 가상 데이터
  const stroeData: Restaurant[] = [
    {
      _id,
      storeId: '3f39c0f0-1ed8-4087-8740-a31c75365f10',
      storeName: '치킨좋아',
      userId: 'dahoon06',
      region: {
        major: '서울',
        district: '구로구',
        town: '구로동',
      },
      categories: {
        majorCategory: '양식',
        middleCategory: ['치킨', '튀김'],
      },
      point: {
        view: 23,
        average: 4.7,
        review: 32,
      },
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isDeleted: false,
    },
  ];
  // 원하는 형태
  const expectedData = [
    {
      title: '치킨좋아',
      location: '구로구/구로동',
      categories: '양식/치킨,튀김',
      viewCount: 23,
      reviewCount: 32,
      point: 4.7,
    },
  ];
  
  const filters = {
    page: 1,
    region: '서울',
    sort: 'grade',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataBaseModule],
      providers: [
        RestaurantService,
        RestaurantRepository,
        {
          provide: getModelToken(Restaurant.name, MongoDataBase.FOODIE),
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<RestaurantRepository>(RestaurantRepository);
    model = module.get<Model<RestaurantDocument>>(
      getModelToken(Restaurant.name, MongoDataBase.FOODIE),
    );
  });

  test('RestauarantModel is defined', () => {
    expect(model).toBeDefined();
  });

  test('RestaurantService is defined', () => {
    expect(service).toBeDefined();
  });

  test('RestaurantRepository is defined', () => {
    expect(repository).toBeDefined();
  });

  test('식당 정보 리스트를 반환한다.', async () => {
    const _id = new Types.ObjectId('65e885a1d907196bb47430c1');
    
    jest
      .spyOn(repository, 'findManyRestaurantLists')
      .mockImplementationOnce(() => Promise.resolve(stroeData));
    const storeLists = await service.getLists(filters);
    expect(storeLists).toStrictEqual(expectedData);
  });
});
```

service 이외에 모듈에서 사용하고 있는 repository, Mongo Collection도 함께 테스팅 모듈에 주입해주면 다른 서비스를 참조하고 있더라도 테스팅이 가능해진다.


   