# Arquitectura de Módulos - Bd_AgroSoft

## Diagrama de Arquitectura Hexagonal

```mermaid
graph TB
    subgraph "INFRASTRUCTURE (Adapters)"
        subgraph "Controllers"
            SC[SensorController<br>/sensores]
            TSC[TipoSensorController<br>/tipos-sensores]
            SLC[SensorLecturaController<br>/sensor-lecturas]
            SAC[SensorAlertaController<br>/sensor-alertas]
            IGCC[IotGlobalConfigController<br>/iot-global-config]
        end
        
        subgraph "Repositories"
            SPR[SensorPostgresRepository]
            TSPR[TipoSensorPostgresRepository]
            SLPR[SensorLecturaPostgresRepository]
            SAPR[SensorAlertaPostgresRepository]
            IGCR[IotGlobalConfigPostgresRepository]
        end
        
        subgraph "DTOs"
            CSD[CreateSensorDto]
            USD[UpdateSensorDto]
            CTSD[CreateTipoSensorDto]
            UTSD[UpdateTipoSensorDto]
            CSLD[CreateSensorLecturaDto]
            CSAD[CreateSensorAlertaDto]
            CICD[CreateIotGlobalConfigDto]
            UICD[UpdateIotGlobalConfigDto]
        end
        
        subgraph "MQTT"
            MSL[MqttSensorListener]
        end
    end
    
    subgraph "APPLICATION (Use Cases)"
        subgraph "Sensores"
            CS1[CrearSensorUseCase]
            OS1[ObtenerSensorUseCase]
            OSS1[ObtenerSensoresUseCase]
            OSA1[ObtenerSensoresActivosUseCase]
            AS1[ActualizarSensorUseCase]
            ES1[EliminarSensorUseCase]
        end
        
        subgraph "Tipos Sensores"
            CS2[CrearTipoSensorUseCase]
            OS2[ObtenerTipoSensorUseCase]
            OTS2[ObtenerTiposSensoresUseCase]
            AS2[ActualizarTipoSensorUseCase]
            ES2[EliminarTipoSensorUseCase]
        end
        
        subgraph "Sensor Lecturas"
            RL3[RegistrarLecturaUseCase]
            OLPS3[ObtenerLecturasPorSensorUseCase]
            OLPRF3[ObtenerLecturasPorRangoFechasUseCase]
        end
        
        subgraph "Sensor Alertas"
            CS4[CrearSensorAlertaUseCase]
            OS4[ObtenerSensorAlertaUseCase]
            OSA4[ObtenerSensorAlertasUseCase]
            OAPS4[ObtenerAlertasPorSensorUseCase]
            ES4[EliminarSensorAlertaUseCase]
        end
        
        subgraph "IoT Global Config"
            CIC5[CrearIotGlobalConfigUseCase]
            OIC5[ObtenerIotGlobalConfigUseCase]
            OICS5[ObtenerIotGlobalConfigsUseCase]
            OCA5[ObtenerConfigActivaUseCase]
            AIC5[ActualizarIotGlobalConfigUseCase]
            EIC5[EliminarIotGlobalConfigUseCase]
        end
    end
    
    subgraph "DOMAIN (Entities & Ports)"
        subgraph "Entities"
            S[Sensor]
            TS[TipoSensor]
            SL[SensorLectura]
            SA[SensorAlerta]
            IGC[IotGlobalConfig]
        end
        
        subgraph "Repository Ports"
            SR[SensorRepository]
            TSR[TipoSensorRepository]
            SLR[SensorLecturaRepository]
            SAR[SensorAlertaRepository]
            IGCR2[IotGlobalConfigRepository]
        end
        
        subgraph "Exceptions"
            SNF[SensorNotFoundException]
            SAE[SensorAlreadyExistsException]
            TSNF[TipoSensorNotFoundException]
            SLNF[SensorLecturaNotFoundException]
            VFDR[ValorFueraDeRangoException]
            SANF[SensorAlertaNotFoundException]
            IGNF[IotGlobalConfigNotFoundException]
        end
    end
    
    subgraph "DATABASE"
        PG[(PostgreSQL)]
    end
    
    %% Infrastructure to Application
    SC --> CS1
    SC --> OS1
    SC --> OSS1
    SC --> OSA1
    SC --> AS1
    SC --> ES1
    
    TSC --> CS2
    TSC --> OS2
    TSC --> OTS2
    TSC --> AS2
    TSC --> ES2
    
    SLC --> RL3
    SLC --> OLPS3
    SLC --> OLPRF3
    
    SAC --> CS4
    SAC --> OS4
    SAC --> OSA4
    SAC --> OAPS4
    SAC --> ES4
    
    IGCC --> CIC5
    IGCC --> OIC5
    IGCC --> OICS5
    IGCC --> OCA5
    IGCC --> AIC5
    IGCC --> EIC5
    
    %% Application to Domain
    CS1 --> S
    OS1 --> S
    OSS1 --> S
    OSA1 --> S
    AS1 --> S
    ES1 --> S
    
    CS2 --> TS
    OS2 --> TS
    OTS2 --> TS
    AS2 --> TS
    ES2 --> TS
    
    RL3 --> SL
    OLPS3 --> SL
    OLPRF3 --> SL
    
    CS4 --> SA
    OS4 --> SA
    OSA4 --> SA
    OAPS4 --> SA
    ES4 --> SA
    
    CIC5 --> IGC
    OIC5 --> IGC
    OICS5 --> IGC
    OCA5 --> IGC
    AIC5 --> IGC
    EIC5 --> IGC
    
    %% Repositories to Ports
    SPR --> SR
    TSPR --> TSR
    SLPR --> SLR
    SAPR --> SAR
    IGCR --> IGCR2
    
    %% Domain to Infrastructure
    SR --> S
    TSR --> TS
    SLR --> SL
    SAR --> SA
    IGCR2 --> IGC
    
    %% Repository to Database
    SPR --> PG
    TSPR --> PG
    SLPR --> PG
    SAPR --> PG
    IGCR --> PG
    
    %% MQTT
    MSL --> S
    
    %% Exceptions
    OS1 --> SNF
    AS1 --> SNF
    ES1 --> SNF
    OS2 --> TSNF
    AS2 --> TSNF
    ES2 --> TSNF
    OS4 --> SANF
    ES4 --> SANF
    OIC5 --> IGNF
    AIC5 --> IGNF
    EIC5 --> IGNF
```

## Diagrama de Relaciones entre Entidades (ERD)

```mermaid
erDiagram
    tipos_sensores {
        int id PK
        string nombre
        string unidad
        int decimales
        string descripcion
        string imagen
        int ttl_minutos
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }
    
    iot_global_config {
        int id PK
        string name
        string broker
        int port
        string protocol
        string topic_prefix
        text default_topics
        text custom_topics
        int lote_id FK
        int sub_lote_id FK
        string username
        string password
        boolean activo
        boolean default_sensors_initialized
        boolean auto_discover
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }
    
    sensores {
        int id PK
        string nombre_sensor
        int tipo_sensor_id FK
        string protocolo
        string endpoint_url
        string mqtt_topic
        double valor_minimo_sensor
        double valor_maximo_sensor
        boolean activo
        string estado_conexion
        text estado
        string ultimo_valor
        timestamp ultima_medicion
        timestamp last_seen_at
        int cultivoId FK
        int creadoPorUsuarioId FK
        int global_config_id FK
        int lote_id FK
        int sub_lote_id FK
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }
    
    sensor_lecturas {
        int id PK
        int sensor_id FK
        string valor
        timestamptz fecha_lectura
        string unidad
        string observaciones
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }
    
    sensor_alertas {
        int id PK
        int sensor_id FK
        double valor
        double umbral
        string tipo
        timestamp fecha_alerta
        int lote_id FK
        int sub_lote_id FK
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }
    
    tipos_sensores ||--o{ sensores : "tiene"
    iot_global_config ||--o{ sensores : "configura"
    sensores ||--o{ sensor_lecturas : "genera"
    sensores ||--o{ sensor_alertas : "produce"
```

## Diagrama de Estructura de Archivos

```mermaid
graph TB
    subgraph "src/modules"
        subgraph "sensores/"
            SM[sensores.module.ts]
            subgraph "domain/"
                SE[entities/sensor.ts]
                SP[ports/sensor.repository.ts]
                subgraph "exceptions/"
                    SNF2[sensor-not-found.exception.ts]
                    SAE2[sensor-already-exists.exception.ts]
                end
            end
            subgraph "application/"
                subgraph "use-cases/"
                    CSU[crear-sensor.use-case.ts]
                    OSU[obtener-sensor.use-case.ts]
                    OSSU[obtener-sensores.use-case.ts]
                    OSASU[obtener-sensores-activos.use-case.ts]
                    ASU[actualizar-sensor.use-case.ts]
                    ESU[eliminar-sensor.use-case.ts]
                end
            end
            subgraph "infrastructure/"
                subgraph "database/"
                    SOE[sensor.orm-entity.ts]
                end
                subgraph "repositories/"
                    SPR2[sensor-postgres.repository.ts]
                end
                subgraph "controllers/"
                    SC2[sensor.controller.ts]
                end
                subgraph "primary/"
                    MSL2[mqtt-sensor-listener.ts]
                end
                subgraph "dto/"
                    CSD2[create-sensor.dto.ts]
                    USD2[update-sensor.dto.ts]
                end
            end
        end
        
        subgraph "tipos-sensores/"
            TSM[tipos-sensores.module.ts]
            subgraph "domain/"
                TSE[entities/tipo-sensor.ts]
                TSP[ports/tipo-sensor.repository.ts]
                TSNE[exceptions/tipo-sensor-not-found.exception.ts]
            end
            subgraph "application/"
                subgraph "use-cases/"
                    CTSU[crear-tipo-sensor.use-case.ts]
                    OTSU[obtener-tipo-sensor.use-case.ts]
                    OTSSU[obtener-tipos-sensores.use-case.ts]
                    ATSU[actualizar-tipo-sensor.use-case.ts]
                    ETSU[eliminar-tipo-sensor.use-case.ts]
                end
            end
            subgraph "infrastructure/"
                subgraph "database/"
                    TSOE[tipo-sensor.orm-entity.ts]
                end
                subgraph "repositories/"
                    TSPR2[tipo-sensor-postgres.repository.ts]
                end
                subgraph "controllers/"
                    TSC2[tipo-sensor.controller.ts]
                end
                subgraph "dto/"
                    CTSD2[create-tipo-sensor.dto.ts]
                    UTSD2[update-tipo-sensor.dto.ts]
                end
            end
        end
        
        subgraph "sensor-lecturas/"
            SLM[sensor-lecturas.module.ts]
            subgraph "domain/"
                SLE[entities/sensor-lectura.ts]
                SLP[ports/sensor-lectura.repository.ts]
                subgraph "exceptions/"
                    SLNE2[sensor-lectura-not-found.exception.ts]
                    VFDR2[valor-fuera-de-rango.exception.ts]
                end
            end
            subgraph "application/"
                subgraph "use-cases/"
                    RLU[registrar-lectura.use-case.ts]
                    OLPSU[obtener-lecturas-por-sensor.use-case.ts]
                    OLPRFU[obtener-lecturas-por-rango-fechas.use-case.ts]
                end
            end
            subgraph "infrastructure/"
                subgraph "database/"
                    SLOE[sensor-lectura.orm-entity.ts]
                end
                subgraph "repositories/"
                    SLPR2[sensor-lectura-postgres.repository.ts]
                end
                subgraph "controllers/"
                    SLC2[sensor-lectura.controller.ts]
                end
                subgraph "dto/"
                    CSLD2[create-sensor-lectura.dto.ts]
                end
            end
        end
        
        subgraph "sensor-alertas/"
            SAM[sensor-alertas.module.ts]
            subgraph "domain/"
                SAE3[entities/sensor-alerta.ts]
                SAP[ports/sensor-alerta.repository.ts]
                SANE[exceptions/sensor-alerta-not-found.exception.ts]
            end
            subgraph "application/"
                subgraph "use-cases/"
                    CSAU[crear-sensor-alerta.use-case.ts]
                    OSAU[obtener-sensor-alerta.use-case.ts]
                    OSASU2[obtener-sensor-alertas.use-case.ts]
                    OAPSU[obtener-alertas-por-sensor.use-case.ts]
                    ESAU[eliminar-sensor-alerta.use-case.ts]
                end
            end
            subgraph "infrastructure/"
                subgraph "database/"
                    SAOE[sensor-alerta.orm-entity.ts]
                end
                subgraph "repositories/"
                    SAPR2[sensor-alerta-postgres.repository.ts]
                end
                subgraph "controllers/"
                    SAC2[sensor-alerta.controller.ts]
                end
                subgraph "dto/"
                    CSAD2[create-sensor-alerta.dto.ts]
                end
            end
        end
        
        subgraph "iot-global-config/"
            IGCM[iot-global-config.module.ts]
            subgraph "domain/"
                IGCE[entities/iot-global-config.ts]
                IGCP[ports/iot-global-config.repository.ts]
                IGNCE[exceptions/iot-global-config-not-found.exception.ts]
            end
            subgraph "application/"
                subgraph "use-cases/"
                    CICU[crear-iot-global-config.use-case.ts]
                    OICU[obtener-iot-global-config.use-case.ts]
                    OICSU[obtener-iot-global-configs.use-case.ts]
                    OCAU[obtener-config-activa.use-case.ts]
                    AICU[actualizar-iot-global-config.use-case.ts]
                    EICU[eliminar-iot-global-config.use-case.ts]
                end
            end
            subgraph "infrastructure/"
                subgraph "database/"
                    IGOE[iot-global-config.orm-entity.ts]
                end
                subgraph "repositories/"
                    IGPR2[iot-global-config-postgres.repository.ts]
                end
                subgraph "controllers/"
                    IGCC2[iot-global-config.controller.ts]
                end
                subgraph "dto/"
                    CICD2[create-iot-global-config.dto.ts]
                    UICD2[update-iot-global-config.dto.ts]
                end
            end
        end
    end
```

## Diagrama de Endpoints API

```mermaid
graph LR
    subgraph "sensores"
        POST1[POST /sensores<br>Crear sensor]
        GET1[GET /sensores<br>Obtener todos]
        GET2[GET /sensores/activos<br>Obtener activos]
        GET3[GET /sensores/:id<br>Obtener uno]
        PUT1[PUT /sensores/:id<br>Actualizar]
        DEL1[DELETE /sensores/:id<br>Eliminar]
    end
    
    subgraph "tipos-sensores"
        POST2[POST /tipos-sensores<br>Crear tipo]
        GET4[GET /tipos-sensores<br>Obtener todos]
        GET5[GET /tipos-sensores/:id<br>Obtener uno]
        PUT2[PUT /tipos-sensores/:id<br>Actualizar]
        DEL2[DELETE /tipos-sensores/:id<br>Eliminar]
    end
    
    subgraph "sensor-lecturas"
        POST3[POST /sensor-lecturas<br>Registrar lectura]
        GET6[GET /sensor-lecturas/sensor/:sensorId<br>Obtener por sensor]
        GET7[GET /sensor-lecturas/sensor/:sensorId/rango<br>Obtener por rango<br>?desde=&hasta=]
    end
    
    subgraph "sensor-alertas"
        POST4[POST /sensor-alertas<br>Crear alerta]
        GET8[GET /sensor-alertas<br>Obtener todas]
        GET9[GET /sensor-alertas/:id<br>Obtener una]
        GET10[GET /sensor-alertas/sensor/:sensorId<br>Obtener por sensor]
        DEL3[DELETE /sensor-alertas/:id<br>Eliminar]
    end
    
    subgraph "iot-global-config"
        POST5[POST /iot-global-config<br>Crear config]
        GET11[GET /iot-global-config<br>Obtener todas]
        GET12[GET /iot-global-config/activa<br>Obtener activa]
        GET13[GET /iot-global-config/:id<br>Obtener una]
        PUT3[PUT /iot-global-config/:id<br>Actualizar]
        DEL4[DELETE /iot-global-config/:id<br>Eliminar]
    end
```

## Resumen de Módulos

| Módulo | Entidad Principal | Use Cases | Endpoints |
|--------|-------------------|-----------|-----------|
| **sensores** | Sensor | 6 | 6 |
| **tipos-sensores** | TipoSensor | 5 | 5 |
| **sensor-lecturas** | SensorLectura | 3 | 3 |
| **sensor-alertas** | SensorAlerta | 5 | 5 |
| **iot-global-config** | IotGlobalConfig | 6 | 6 |
| **TOTAL** | | **25** | **25** |
