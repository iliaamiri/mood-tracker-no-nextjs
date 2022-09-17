# mood-tracker-no-nextjs
.NET Core + React

# Database -> Making the table

```sql
/****** Object:  Table [dbo].[mood]    Script Date: 9/16/2022 11:14:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[mood](
	[moodId] [int] IDENTITY(1,1) NOT NULL,
	[feelingText] [nvarchar](64) NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[rating] [int] NOT NULL,
 CONSTRAINT [PK_mood] PRIMARY KEY CLUSTERED 
(
	[moodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[mood] ADD  CONSTRAINT [DF_mood_createdAt]  DEFAULT (getdate()) FOR [createdAt]
GO

ALTER TABLE [dbo].[mood]  WITH CHECK ADD  CONSTRAINT [CK_mood] CHECK  (([rating]<=(10) AND [rating]>=(0)))
GO

ALTER TABLE [dbo].[mood] CHECK CONSTRAINT [CK_mood]
GO
```
